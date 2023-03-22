const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', 'username name id')
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	let { title, author, url, likes } = request.body
	if (title === undefined || url === undefined)
		return response.status(400).json('Missing title or url from blog post')
	likes === undefined ? likes = 0 : likes

	const user = request.user
	const blog = new Blog({ title, author, url, likes, user: user._id })

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const user = request.user
	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() !== user.id.toString())
		return response.status(401).json({ error: 'user has no rights to delete this blog' })
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	let { title, author, url, likes } = request.body
	if (title === undefined || url === undefined)
		return response.status(400).json('Bad Request')
	likes === undefined ? likes = 0 : likes

	const newInfo = ({ title, author, url, likes })
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newInfo)
	response.status(204).json(updatedBlog)
})

module.exports = blogsRouter