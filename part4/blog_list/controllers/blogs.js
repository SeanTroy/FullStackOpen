const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	let { title, author, url, likes } = request.body
	if (title === undefined || url === undefined)
		return response.status(400).json('Bad Request')
	likes === undefined ? likes = 0 : likes
	const blog = new Blog({ title, author, url, likes })

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

module.exports = blogsRouter