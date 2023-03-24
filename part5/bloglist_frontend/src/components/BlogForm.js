import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setNotification }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const addBlog = async (event) => {
		event.preventDefault()
		const newBlog = {
			title: newTitle,
			author: newAuthor,
			url: newUrl
		}
		try {
			await blogService.create(newBlog)
			setNewTitle('')
			setNewAuthor('')
			setNewUrl('')
			const updatedBlogs = await blogService.getAll()
			setBlogs(updatedBlogs)
			setNotification({ info: `A new blog ${newBlog.title} by ${newBlog.author} added.`, state: 'success' })
			setTimeout(() => {
				setNotification(null)
			}, 5000)
		} catch (exception) {
			setNotification({ info: 'Blog saving failed. Please enter all fields.', state: 'error' })
			setTimeout(() => {
				setNotification(null)
			}, 5000)
		}
	}

	const handleTitleChange = (event) => {
		setNewTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setNewUrl(event.target.value)
	}

	return (
		<form onSubmit={addBlog}>
			<h2>Create new</h2>
			<p>title:
				<input
					value={newTitle}
					onChange={handleTitleChange}
				/>
			</p>
			<p>author:
				<input
					value={newAuthor}
					onChange={handleAuthorChange}
				/>
			</p>
			<p>url:
				<input
					value={newUrl}
					onChange={handleUrlChange}
				/>
			</p>
			<button type="submit">create</button>
			<p></p>
		</form>
	)
}

export default BlogForm