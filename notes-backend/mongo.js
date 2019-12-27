const mongoose = require('mongoose');

if (process.argv.length < 3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@node0-ixxxs.gcp.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = new mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'Browser can execute only Javascript',
  date: new Date(),
  important: false,
})

// note.save().then(response => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
})