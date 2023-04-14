import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
	const [display, setDisplay] = useState(false)
	const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
	const liked = blog.liked_users.find(u => u.username === user.username)

	const toggleDisplay = () => {
		setDisplay(!display)
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
							{!liked && <button onClick={() => likeBlog(blog, liked)}>like</button>}
							{liked && <button onClick={() => likeBlog(blog, liked)}>unlike</button>}
						</div>
						<div>added by: {blog.user.name}</div>
						{user !== null && user.username === blog.user.username &&
							<button style={removeButtonStyle} onClick={() => deleteBlog(blog)}>remove</button>}
					</div>
				</>
			}
		</div>
	)
}

export default Blog