const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	const user = await User.findOne({ username })
	const passwordAccepted = user === null
		? false
		: await bcrypt.compare(password, user.hashedPassword)

	if (!(user && passwordAccepted)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id
	}

	// one hour expiration for token
	const token = jwt.sign(userForToken, process.env.SECRET, expiresIn = 60 * 60)

	response
		.status(200)
		.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
