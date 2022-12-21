const mongoose = require('mongoose')

const len = process.argv.length
const [,,password,name,number] = process.argv
const url = `mongodb+srv://danny:${password}@phonebook.zp3rlwc.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)


if (len != 5 && len != 3) {
  console.log('***Examples***')
  console.log('post new person : node mongo.js <password> <name> <number>')
  console.log('get all persons : node mongo.js <password>')
  process.exit(1)
} else if (len === 5) {
  mongoose.connect(url)
  .then((result) => {
    const person = new Person({
      name: name,
      number: number
    })
    return person.save()
  })
  .then(() => {
    console.log('person saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))

} else if (len === 3) {
  mongoose.connect(url)
  .then(result => {
     Person
    .find({})
    .then(result => {
      console.log('phonebook')
      result.forEach(p => console.log(`${p.name} ${p.number}`))
      return mongoose.connection.close()
    })
  })
  .catch((err) => console.log(err))

} else {
  console.log('something went wrong')
}









