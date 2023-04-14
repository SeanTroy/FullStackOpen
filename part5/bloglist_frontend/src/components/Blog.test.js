import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
	title: 'Test Title',
	author: 'Test Author',
	url: 'Test Url',
	likes: 999,
	liked_users: [],
	user: {
		username: 'testuser',
		name: 'Test User'
	}
}

test('renders only title and author by default', () => {
	render(<Blog blog={blog} />)

	screen.getByText(`${blog.title} by ${blog.author}`)
	const url = screen.queryByText(`url: ${blog.url}`)
	const likes = screen.queryByText(`likes: ${blog.likes}`)
	expect(url).toBeNull()
	expect(likes).toBeNull()
})

test('also url and likes are rendered after view button', async () => {
	render(<Blog blog={blog} />)

	const button = screen.getByText('view')
	const user = userEvent.setup()
	await user.click(button)

	screen.getByText(`${blog.title} by ${blog.author}`)
	screen.getByText(`url: ${blog.url}`)
	screen.getByText(`likes: ${blog.likes}`)
})


test('like button clicked twice calls event handler twice', async () => {
	const mockHandler = jest.fn()

	render(<Blog blog={blog} likeBlog={mockHandler}/>)

	const user = userEvent.setup()
	let viewbutton = screen.getByText('view')
	await user.click(viewbutton)
	const likebutton = screen.getByText('like')
	await user.click(likebutton)
	await user.click(likebutton)
	expect(mockHandler.mock.calls).toHaveLength(2)
})

test('creating a new blog calls event handler with correct data', async () => {
	const mockHandler = jest.fn()

	render(<BlogForm createBlog={mockHandler}/>)

	const user = userEvent.setup()
	const input = screen.getAllByRole('textbox')
	await user.type(input[0], 'Test Title')
	await user.type(input[1], 'Test Author')
	await user.type(input[2], 'Test Url')
	const button = screen.getByText('create')
	await user.click(button)
	expect(mockHandler.mock.calls).toHaveLength(1)
	expect(mockHandler.mock.calls[0][0].title).toBe('Test Title')
	expect(mockHandler.mock.calls[0][0].author).toBe('Test Author')
	expect(mockHandler.mock.calls[0][0].url).toBe('Test Url')
})