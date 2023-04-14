const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({ username: { $ne: 'permanentuser' } }) // deleting everyone except permanentuser
	const hashedPassword = await bcrypt.hash("tester", 10);
	const user = await new User({ username: "tester", hashedPassword }).save();
	const userResponse = await api.post('/api/login').send({ username: 'tester', password: 'tester' })

	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs.map(blog => {
		blog.user = '64393cbadfcad7866b6f2411' // user id of "permanentuser"
		return new Blog(blog)
	})
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)

	return (token = userResponse.body.token)
})

describe('when retrieving blogs', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('unique identifier is named id', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].id).toBeDefined()
	})
})

describe('when adding blogs', () => {
	test('a new blog can be added', async () => {
		const newBlog = {
			title: "Script Notes",
			author: "Craig Mazin",
			url: "https://johnaugust.com/scriptnotes",
			likes: 16,
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)

		const currentBlogs = await helper.blogsInDatabase()
		expect(currentBlogs).toHaveLength(helper.initialBlogs.length + 1)

		const blogContents = currentBlogs.map(blog => blog.title)
		expect(blogContents).toContain("Script Notes")
	})

	test('missing token returns 401', async () => {
		const newBlog = {
			title: "Script Notes",
			author: "Craig Mazin",
			url: "https://johnaugust.com/scriptnotes",
			likes: 16,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)

		const currentBlogs = await helper.blogsInDatabase()
		expect(currentBlogs).toHaveLength(helper.initialBlogs.length)
	})

	test('missing likes defaults to zero', async () => {
		const newBlog = {
			title: "Script Notes",
			author: "Craig Mazin",
			url: "https://johnaugust.com/scriptnotes"
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)

		const currentBlogs = await helper.blogsInDatabase()
		const addedBlog = currentBlogs.filter(blog => blog.title === "Script Notes")

		expect(addedBlog[0].likes).toEqual(0)
	})

	test('missing title returns 400', async () => {
		const newBlog = {
			author: "Craig Mazin",
			url: "https://johnaugust.com/scriptnotes",
			likes: 10
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})

	test('missing url returns 400', async () => {
		const newBlog = {
			title: "Script Notes",
			author: "Craig Mazin",
			likes: 10
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})

describe('deleting a blog', () => {
	test('returns 204 with valid id', async () => {
		const newBlog = {
			title: "Script Notes",
			author: "Craig Mazin",
			url: "https://johnaugust.com/scriptnotes",
			likes: 16,
		}

		const blogToDelete = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)

		await api
			.delete(`/api/blogs/${blogToDelete.body.id}`)
			.set('Authorization', `bearer ${token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDatabase()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const blogIds = blogsAtEnd.map(blog => blog.id)
		expect(blogIds).not.toContain(blogToDelete.body.id)
	})
})

describe('updating a blog', () => {
	test('updates the likes with valid id', async () => {
		const blogsAtStart = await helper.blogsInDatabase()
		const blogToUpdate = blogsAtStart[0]

		const newBlog = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: blogToUpdate.likes + 1
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDatabase()

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

		const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
		expect(updatedBlog.likes).toEqual(blogToUpdate.likes + 1)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
