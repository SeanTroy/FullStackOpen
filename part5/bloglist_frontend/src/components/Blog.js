import { useState } from 'react'

const Blog = ({ blog }) => {
	const [display, setDisplay] = useState(false)

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
						<div>likes: {blog.likes} <button>like</button></div>
						<div>added by: {blog.user.name}</div>
					</div>
				</>
			}
		</div>
	)
}

export default Blog