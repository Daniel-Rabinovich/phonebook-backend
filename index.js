//
// imports
//
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

//
// middleware
//
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
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

//
// Api routes
//
app.get('/info', (request, response) => {
    Person.find({})
    .then(persons => {
      let amount = persons.reduce((t,p) => t +=1, 0)
      const date = new Date()
      response.send(
          `Phonebook has info for ${amount} people,<br> ${date}`
      )
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(persons => {
      response.json(persons)
    })
})

app.post('/api/persons', (request, response) => {

    if(request.body.name === undefined || request.body.number === undefined) {
      return response.status(400).json({ error: "name or number missing!"})
    }

    const query = {
      "name": {
        $regex : `^${request.body.name}$`,
        $options: "i"
      }
    }

    Person.findOne(query)
    .then(person => {
      if(person != null) {
        return response.status(400).json({ error: "name already exists!"})
      } else {
        const newP = new Person({
          name: request.body.name,
          number: request.body.number
        })
        newP.save().then(savedPerson => {
          return response.json(savedPerson)
        })
      }
    })
    .catch(err => {
      return response.status(400).json({ error: err})
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
      return response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



