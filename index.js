const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456",
      "show": true
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "show": true
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "show": true
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "show": true
    }
]

app.get('/', (request, response) => {
    response.send("<h1>Hello World</h1>")
})

app.get('/info', (request, response) => {
    const amount = persons.reduce((t, p) => t += 1,0)
    const date = new Date()
    response.send(
        `Phonebook has info for ${amount} people,<br> ${date}`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {

    const person = request.body

    const duplicate = persons.find(
        p => p.name.toLowerCase() === person.name.toLowerCase()
    )

    if (!person.name || !person.number){
        response.status(400)
        .json({ error: 'missing content' })
    } else if (duplicate) {
        response.status(400)
        .json({ error: 'name must be unique' })
    } else {
        const newP = {
            id: Math.floor(Math.random()*10000000),
            name: person.name,
            number: person.number,
            show: true
        }
        persons = persons.concat(newP)
        response.json(newP)
    }
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const p = persons.find(p => p.id === id)

    if (p) {
        response.json(p)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



