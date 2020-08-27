const getPage = require('./getPage')

async function getInformation(url, page) {
  let result = []
  const $ = await getPage(url)
  const cards = $('[data-qa="vacancy-serp__vacancy"]').each((i, el) => {
    result.push($(el))
  })

  const nextPage = $('a[data-qa="pager-next"]')
  console.log(`Page ${page} found ${cards.length}`)
  if (nextPage.attr('href')) {
    const nextCards = await getInformation('https://hh.ru'+nextPage.attr('href'), ++page)
    result = result.concat(nextCards)
  }

  return result
}

async function getDescription(url) {
  const $ = await getPage(url)
  const location = $('[data-qa="vacancy-view-location"]').text()
  const experience = `Требуемый опыт работы  ${$('[data-qa="vacancy-experience"]').text()}`
  const description = $('[data-qa="vacancy-description"]').text()
  return {
    experience,
    description,
    location
  }
}

async function run(url) {
  const result = []
  const cards = await getInformation(url, 1)

  for (const card of cards) {
    let offerData = {
      offer: card.find('.bloko-link.HH-LinkModifier').text(),
      salary: card.find('[data-qa="vacancy-serp__vacancy-compensation"]').text(),
      href: card.find('.bloko-link.HH-LinkModifier').attr('href')
    }
    offerData.additional = await getDescription(offerData.href)
    result.push(offerData)
  }
  return result
}

module.exports = async function(url) {
  try {
    const cards = await run(url)
    return cards
  } catch (e) {
    throw e
  }
}
