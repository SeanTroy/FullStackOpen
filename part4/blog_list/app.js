require('dotenv').config()
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors') // to eliminate the need for try/catch, automatically passes to error handling middleware
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connection to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app