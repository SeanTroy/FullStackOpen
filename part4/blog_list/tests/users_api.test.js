const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany()

	const userObjects = helper.initialUsers.map(user => new User(user))
	const promiseArray = userObjects.map(user => user.save())
	await Promise.all(promiseArray)
})

describe('when creating new users', () => {
	test('valid user can be added', async () => {
		const newUser = {
			username: 'validuser',
			name: "Perfect information",
			password: 'PerfectpassW0rD'
		}

		const response = await api.post('/api/users').send(newUser).expect(201)

		const currentUsers = await helper.usersInDatabase()
		expect(currentUsers.length).toEqual(helper.initialUsers.length + 1)

		const userContents = currentUsers.map(user => user.username)
		expect(userContents).toContain('validuser')
	})

	test('too short username returns 400 and error', async () => {
		const newUser = {
			username: 'wi',
			name: "Short user",
			password: 'nevermind'
		}

		const response = await api.post('/api/users').send(newUser).expect(400)

		expect(response.body.error).toBeDefined()
	})

	test('too short password returns 400 and error', async () => {
		const newUser = {
			username: 'reasonable',
			name: "Short password user",
			password: 'no'
		}

		const response = await api.post('/api/users').send(newUser).expect(400)

		expect(response.body.error).toBeDefined()
	})

	test('existing username returns 400 and error', async () => {
		const newUser = {
			username: 'testuser',
			password: 'nevermind'
		}

		const response = await api.post('/api/users').send(newUser).expect(400)

		expect(response.body.error).toBeDefined()
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
