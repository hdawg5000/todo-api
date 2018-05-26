const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB Server')

    const db = client.db('Todo')

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate(
    //     {
    //         _id: new ObjectID('5b08df647002b56668d3686b')
    //     },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }
    // ).then((result) => {
    //     console.log(result)
    // }, (err) => {
    //     console.log(err)
    // })

    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectID('5b08df647002b56668d3686b') },
        {
            $set: {
                name: 'Hammad'
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        }
    ).then((result) => {
        console.log(JSON.stringify(result, undefined, 2))
    }, (err) => {
        console.log('An error occurred', err)
    })

    // db.close()
})