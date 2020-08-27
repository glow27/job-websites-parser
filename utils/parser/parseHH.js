const getPage = require('./getPage')
const Vacancy = require('../../models/Vacancy')
const CV = require('../../models/CV')

async function getInformation(url, page, settings) {
  let result = []
  const $ = await getPage(url)
  const cards = $(settings.container).each((i, el) => {
    result.push($(el))
  })

  const nextPage = $('a[data-qa="pager-next"]')
  console.log(`Page ${page} found ${cards.length}`)
  const link = nextPage.attr('href')
  if (link) {
    const nextCards = await getInformation(
        'https://hh.ru' + link, ++page, settings)
    result = result.concat(nextCards)
  }
  return result
}

async function run(url, settings) {
  const result = []
  const cards = await getInformation(url, 1, settings)
  if (settings.type === 'vacations') {
    for (const card of cards) {
      let offerData = {
        offer: card.find('.bloko-link.HH-LinkModifier').text(),
        salary: card.find('[data-qa="vacancy-serp__vacancy-compensation"]').
            text() === '' ? 'Договорная' : card.find('[data-qa="vacancy-serp__vacancy-compensation"]').text(),
        href: card.find('.bloko-link.HH-LinkModifier').attr('href'),
        publicDate: card.find('.vacancy-serp-item__publication-date').text()
      }
      const newVacancy = new Vacancy({
        offer: offerData.offer,
        salary: offerData.salary,
        href: offerData.href,
        publicDate: offerData.publicDate,
        type: settings.profession
      })

      await newVacancy.save()

      result.push(offerData)
    }
  } else {
    for (const card of cards) {
      let resumeData = {
        position: card.find('[data-qa="resume-serp__resume-title"]').text(),
        age: card.find('[data-qa="resume-serp__resume-age"]').text(),
        salary: card.find('.resume-search-item__compensation').text(),
        experience: card.find('[data-qa="resume-serp__resume-excpirience-sum"]').text(),
        lastWork: card.find('[data-qa="resume-serp_resume-item-content"]').text(),
        href: 'https://hh.ru'+card.find('[data-qa="resume-serp__resume-title"]').attr('href'),
        type: settings.profession
      }
      const newCV = new CV({
        position: resumeData.position,
        age: resumeData.age,
        salary: resumeData.salary,
        experience: resumeData.experience,
        lastWork: resumeData.lastWork,
        href: resumeData.href,
        type: settings.profession
      })

      await newCV.save()
      result.push(resumeData)
    }
  }
  return result
}

module.exports = async function parse(url, type) {
  try {
    const profession = decodeURIComponent(url.slice(url.indexOf('text='), url.lastIndexOf('&')).slice(5, url.length).replace(/\+/g, ' '))
    let settings = {}
    if (type === 'vacations') {
      settings = {
        container: '[data-qa="vacancy-serp__vacancy"]',
        type,
      }
    } else {
      settings = {
        container: '[data-qa="resume-serp__resume"]',
        type
      }
    }
    settings.profession = profession
    console.log('>>>>>>>>>>>>>>START<<<<<<<<<<<<<<')
    const cards = await run(url, settings)
    console.log('>>>>>>>>>>>>>>END<<<<<<<<<<<<<<')
    return cards
  } catch (e) {
    throw e
  }
}

