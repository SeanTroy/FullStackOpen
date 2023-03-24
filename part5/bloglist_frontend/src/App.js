import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON)
			blogService.setToken(user.token)
			setUser(user)
		}
	}, [])

	return (
		<div>
			{/* <Notification message={errorMessage} /> */}

			{user === null && <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />}
			{user !== null &&
				<div>
					<h2>Blogs</h2>
					<p>{user.name} logged in
						<button
							type="submit"
							onClick={() => {
								window.localStorage.removeItem('loggedInUser')
								blogService.setToken(null)
								setUser(null)}}>
							logout
						</button>
					</p>
					<BlogForm />
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			}
		</div>
	)
}

export default App