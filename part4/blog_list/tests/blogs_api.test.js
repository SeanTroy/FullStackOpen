const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
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
			.send(newBlog)
			.expect(201)

		const currentBlogs = await helper.blogsInDatabase()
		expect(currentBlogs).toHaveLength(helper.initialBlogs.length + 1)

		const blogContents = currentBlogs.map(blog => blog.title)
		expect(blogContents).toContain("Script Notes")
	})

	test('missing likes defaults to zero', async () => {
		const newBlog = {
			title: "Script Notes",
			author: "Craig Mazin",
			url: "https://johnaugust.com/scriptnotes"
		}

		await api
			.post('/api/blogs')
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
		const blogsAtStart = await helper.blogsInDatabase()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDatabase()

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

		const blogIds = blogsAtEnd.map(blog => blog.id)
		expect(blogIds).not.toContain(blogToDelete.id)
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
