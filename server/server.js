const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json()) // Middlewear

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({ todos })
    }, (err) => { res.status(400).send(err) })
})

// GET /todos/ID
app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send({ error: 'Invalid ID' })
    }
    Todo.findById(req.params.id).then((todo) => {
        if (!todo) {
            res.status(404).send({ error: 'Todo not found' })
        }

        res.status(200).send({ todo })

    }).catch((e) => {
        res.status(400).send()
    })
})

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send({ error: 'Invalid ID' })
    }
    Todo.findByIdAndRemove(req.params.id).then((todo) => {
        if (!todo) {
            res.status(404).send({ error: 'Todo not found and was not deleted' })
        } else {
            res.status(200).send({ todo })
        }
    }).catch((e) => {
        res.status(400).send()
    })
})

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id

    // Pull certain items from the req body and ignore others
    var body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ error: 'Invalid ID' })
    }

    // Update completedAt property
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send('Todo not found and was not updated')
        }
        res.status(200).send({ todo })
    }).catch((e) => {
        res.status(400).send()
    })
})

app.listen(port, () => {
    console.log(`Started server on port ${port}`)
})

module.exports = {
    app
}