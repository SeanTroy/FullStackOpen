import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
	const [display, setDisplay] = useState(false)
	const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
	const liked = user.likes.includes(blog.id)

	const toggleDisplay = () => {
		setDisplay(!display)
	}

	const likeBlog = async () => {
		if (liked) {
			await blogService.update(blog.id, { ...blog, likes: blog.likes - 1 })
			const updatedBlogs = blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes - 1 } : b)
			setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
			user.likes = user.likes.filter(id => id !== blog.id)
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
		}
		else {
			await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
			const updatedBlogs = blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b)
			setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
			user.likes = user.likes.concat(blog.id)
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
		}
	}

	const deleteBlog = async () => {
		if (window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author}?`)) {
			await blogService.remove(blog.id)
			const updatedBlogs = blogs.filter(b => b.id !== blog.id)
			setBlogs(updatedBlogs)
		}
	}

	const blogStyle = {
		width: 'max-content',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const buttonStyle = {
		marginLeft: 5,
	}

	const removeButtonStyle = {
		backgroundColor: 'red',
	}

	return (
		<div style={blogStyle}>
			{blog.title} by {blog.author}
			{!display &&
				<button style={buttonStyle} onClick={() => toggleDisplay()}>view</button>}
			{display &&
				<>
					<button style={buttonStyle} onClick={() => toggleDisplay()}>hide</button>
					<div>
						<div>url: {blog.url}</div>
						<div>likes: {blog.likes}
							{!liked && <button onClick={() => likeBlog()}>like</button>}
							{liked && <button onClick={() => likeBlog()}>unlike</button>}
						</div>
						<div>added by: {blog.user.name}</div>
						{user.username === blog.user.username &&
							<button style={removeButtonStyle} onClick={() => deleteBlog()}>remove</button>}
					</div>
				</>
			}
		</div>
	)
}

export default Blog