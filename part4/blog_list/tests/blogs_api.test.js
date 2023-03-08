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

	console.log(addedBlog)

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

afterAll(async () => {
	await mongoose.connection.close()
})
