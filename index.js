const express = require('express')
const app = express()

let persons = [
  {
    name: 'Arto Hellas',
    number: 040 - 123456,
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: 39 - 44 - 5323523,
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: 12 - 43 - 234345,
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'q',
    number: 500,
    id: 7,
  },
]

app.use(express.json())
app.use(cors())

const getId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxId + 1
}

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)
  res.json(person)
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  //console.log(body)
  if (!body.name || !body.number) {
    return res.status(404).json({ content: 'missing name or number' })
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: getId(),
    }
    persons = persons.concat(person)
    res.json(person)
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
