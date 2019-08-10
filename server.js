const express = require('express')
const nocache = require('nocache')
const path = require('path')
const bodyParser = require('body-parser')

const tasks = require('./routes/tasks')
const cors = require('cors')

const port = 3000

const app = express()
app.use(cors())
app.use(nocache())

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api',tasks)

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})
