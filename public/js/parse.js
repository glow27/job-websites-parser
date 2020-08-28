const parseVacancy = document.querySelector('[data-qa="vacancy"]')
const parseCv = document.querySelector('[data-qa="cv"]')
const valueToParse = document.querySelector('#search')
const counterValueToParse = document.querySelector('#email_inline')

parseCv.addEventListener('click', updateCv)
parseVacancy.addEventListener('click', updateVacancy)

async function updateCv(e) {
  e.preventDefault()
  const input = valueToParse.value
  const counter = counterValueToParse.value
  const body = {
    input,
    counter
  }

  const res = await fetch('/api/parser/cv', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await res.json()
  console.log(result.result)
}

async function updateVacancy(e) {
  e.preventDefault()
  const input = valueToParse.value
  const counter = counterValueToParse.value
  const body = {
    input,
    counter
  }
  const res = await fetch('/api/parser/vacancy', {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await res.json()
  console.log(result.result)

}
