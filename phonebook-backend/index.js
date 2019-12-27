require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// let persons = [
//   { name: 'Arto Hellas', number: '040-123456', id: 1 },
//   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
//   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
//   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
// ];

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
  // if (person === undefined) {
  //   res.status(404).end();
  // } else {
  //   res.json(person);
  // }
});

app.get('/info', (req, res) => {
  res.send(
    200,
    `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `
  );
});

app.post('/api/persons', (req, res, next) => {
  const persons = Person.find({ name: req.body.name }).exec();
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }
  if (persons.length > 0) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(savedContact => {
      res.json(savedContact.toJSON());
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updated => {
      res.json(updated.toJSON());
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`🚀 Server running on localhost:${PORT}`);
