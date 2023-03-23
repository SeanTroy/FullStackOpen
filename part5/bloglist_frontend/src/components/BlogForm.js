import { useState } from 'react'

const BlogForm = () => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
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
		</form>
	)
}

export default BlogForm