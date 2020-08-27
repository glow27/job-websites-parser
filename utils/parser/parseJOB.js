const getPage = require('./getPage')
const Vacancy = require('../../models/Vacancy')
const CV = require('../../models/CV')

async function getInformation(url, page, settings) {
  let result = []
  const $ = await getPage(url)
  const cards = $(settings.container).each((i, el) => {
    result.push($(el))
  })

  const nextPage = $('.icMQ_._1_Cht._3ze9n.f-test-button-dalshe' +
      '.f-test-link-Dalshe')
  console.log(`Page ${page} found ${cards.length}`)
  const link = nextPage.attr('href')
  if (link) {
    const nextCards = await getInformation(
        'https://superjob.ru/' + link, ++page, settings)
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
        offer: card.find(
            'icMQ_._6AfZ9.f-test-link-Veb-razrabotchik._2JivQ._1UJAN').text(),
        salary: card.find('._1OuF_._1qw9T.f-test-text-company-item-salary').
            text(),
        href: card.find(
            'icMQ_._6AfZ9.f-test-link-Veb-razrabotchik._2JivQ._1UJAN').
            attr('href'),
        publicDate: card.find('._3mfro.f-test-text-company-item-location' +
            '._9fXTd._2JVkc._2VHxz').text(),
      }
      const newVacancy = new Vacancy({
        offer: offerData.offer,
        salary: offerData.salary,
        href: offerData.href,
        publicDate: offerData.publicDate,
        type: settings.profession,
        from: 'superJob',
      })

      // await newVacancy.save()
      console.log(newVacancy)
      result.push(offerData)
    }
  } else {
    //   for (const card of cards) {
    //     let resumeData = {
    //       position: card.find('[data-qa="resume-serp__resume-title"]').text(),
    //       age: card.find('[data-qa="resume-serp__resume-age"]').text(),
    //       salary: card.find('.resume-search-item__compensation').text(),
    //       experience: card.find('[data-qa="resume-serp__resume-excpirience-sum"]').text(),
    //       lastWork: card.find('[data-qa="resume-serp_resume-item-content"]').text(),
    //       href: 'https://hh.ru'+card.find('[data-qa="resume-serp__resume-title"]').attr('href'),
    //       type: settings.profession
    //     }
    //     const newCV = new CV({
    //       position: resumeData.position,
    //       age: resumeData.age,
    //       salary: resumeData.salary,
    //       experience: resumeData.experience,
    //       lastWork: resumeData.lastWork,
    //       href: resumeData.href,
    //       type: settings.profession,
    //       from: 'superJob'
    //     })
    //
    //     await newCV.save()
    //     result.push(resumeData)
    //   }
    // }
    return result
  }
}

module.exports = async function parse(url, type) {
  try {
    const profession = decodeURIComponent(
        url.slice(url.indexOf('='), url.lastIndexOf('&')).slice(1, url.length))
    let settings = {}
    console.log(profession)
    if (type === 'vacancy') {
      settings = {
        container: '._3zucV._1fMKr.undefined._3tcTB._3SGgo',
        type,
      }
    } else {
      settings = {
        container: '',
        type,
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

