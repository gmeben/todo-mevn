const express = require('express')
const router = express.Router()
const mongojs = require('mongojs')
const db = mongojs('meantask', ['tasks'])

router.get('/tasks', (request, response) => {
    db.tasks.find((error, tasks) => {
        if (error) {
            response.send(error)
        }
        response.json(tasks)
    })
})

router.post('/task', (request, response) => {
    const task = request.body
    if (!task.title) {
        response.status(400)
        response.json({
            error: 'Bad Data'
        })
    } else {
        db.tasks.save(task, (error, task) => {
            if (error) {
                response.send(error)
            }
            response.json(task)
        })
    }
})

router.delete('/task/:id', (request, response) => {
    db.tasks.remove({_id: mongojs.ObjectId(request.params.id)}, (error, task) => {
        if (error) {
            response.send(error)
        }
        response.json(task)
    })
})

router.put('/task/:id', (request, response) => {
    const task = request.body
    const updateTask = {}

    if (task.title) {
        updateTask.title = task.title
    }

    if (!updateTask) {
        response.status(400)
        response.json({
            error: 'Bad Data'
        })
    } else {
        db.tasks.update(
            {
                _id: mongojs.ObjectId(request.params.id)
            },
            updateTask,
            {},
            (error, task) => {
                if (error) {
                    response.send(error)
                }
                response.json(task)
            }
        )
    }
})

module.exports = router
