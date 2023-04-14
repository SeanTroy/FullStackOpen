import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
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
		const result = await createBlog(newBlog)
		if (result === true) {
			setNewTitle('')
			setNewAuthor('')
			setNewUrl('')
		}
	}

	return (
		<form onSubmit={addBlog}>
			<h2>Create new</h2>
			<p>title:
				<input
					name="title"
					value={newTitle}
					onChange={(event) => setNewTitle(event.target.value)}
				/>
			</p>
			<p>author:
				<input
					name="author"
					value={newAuthor}
					onChange={(event) => setNewAuthor(event.target.value)}
				/>
			</p>
			<p>url:
				<input
					name="url"
					value={newUrl}
					onChange={(event) => setNewUrl(event.target.value)}
				/>
			</p>
			<button style={{ marginBottom: '10px' }} type="submit">create</button>
		</form>
	)
}

export default BlogForm