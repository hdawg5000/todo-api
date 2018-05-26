const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('An error occurred', err)
    }

    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    // // Insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Hammad',
    //     age: 25,
    //     location: 'Madison'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Something went wrong inserting into Users', err)
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
    // })


    client.close()
})