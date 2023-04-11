import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author by default', () => {
	const blog = {
		title: 'Test Title',
		author: 'Test Author',
		url: 'Test Url',
		likes: 999,
		liked_users: [],
	}
	const blogs = blog

	render(<Blog blog={blog} blogs={blogs} />)

	screen.getByText(`${blog.title} by ${blog.author}`)
	const url = screen.queryByText(`url: ${blog.url}`)
	const likes = screen.queryByText(`likes: ${blog.likes}`)
	expect(url).toBeNull()
	expect(likes).toBeNull()
})

test('also url and likes are rendered after view button', async () => {
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
	const blogs = blog

	render(<Blog blog={blog} blogs={blogs} />)

	const button = screen.getByText('view')
	const user = userEvent.setup()
	await user.click(button)

	screen.getByText(`${blog.title} by ${blog.author}`)
	screen.getByText(`url: ${blog.url}`)
	screen.getByText(`likes: ${blog.likes}`)
})
