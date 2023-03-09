const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (!username || !password)
		return response.status(400).json({error: 'Username and password are required.'})

	if (password.length < 3)
		return response.status(400).json({error: 'Username and password needs to be at least 3 characters long.'})

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = new User({
		username,
		name,
		hashedPassword
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

module.exports = usersRouter