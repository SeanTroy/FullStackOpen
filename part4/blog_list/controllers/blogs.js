const blogsRouter = require('express').Router()
const { bulkSave } = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', 'username name id')
		.populate('liked_users', 'username name id')
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	let { title, author, url, likes } = request.body
	if (!title || !author || !url)
		return response.status(400).json('Missing title, author or url from blog post')
	likes === undefined ? likes = 0 : likes

	const user = request.user
	if (!user)
		return response.status(401).json({ error: 'token missing or invalid' })
	const blog = new Blog({ title, author, url, likes, user: user._id })

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const user = request.user
	if (!user)
		return response.status(401).json({ error: 'token missing or invalid' })
	const blog = await Blog.findById(request.params.id)
	if (!blog)
		return response.status(404).json({ error: 'blog not found' })

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

	const user = request.user
	if (!user)
		return response.status(401).json({ error: 'token missing or invalid' })

	const blogToUpdate = await Blog.findById(request.params.id)

	if (!blogToUpdate.liked_users.find(user => user.toString() === request.user.id.toString())) {
		blogToUpdate.likes += 1
		blogToUpdate.liked_users = blogToUpdate.liked_users.concat(request.user.id)
	} else {
		blogToUpdate.likes -= 1
		blogToUpdate.liked_users = blogToUpdate.liked_users.filter(user => user.toString() !== request.user.id.toString())
	}
	const updatedBlog = await blogToUpdate.save()

	response.status(204).json(updatedBlog)
})

module.exports = blogsRouter