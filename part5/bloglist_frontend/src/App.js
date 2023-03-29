import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notification, setNotification] = useState(null)
	const [user, setUser] = useState(null)

	useEffect(() => {
		if (user)
			blogService.getAll().then(blogs => {
				const arrangedBlogs = blogs.sort((a, b) => b.likes - a.likes)
				setBlogs(arrangedBlogs)
			})
	}, [user])

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON)
			blogService.setToken(user.token)
			setUser(user)
		}
	}, [])

	const createBlog = async (newBlog) => {
		try {
			const returnedBlog = await blogService.create(newBlog)
			returnedBlog.user = { username: user.username }
			console.log(returnedBlog)
			setBlogs(blogs.concat(returnedBlog))
			setNotification({ info: `A new blog ${newBlog.title} by ${newBlog.author} added.`, state: 'success' })
			setTimeout(() => {
				setNotification(null)
			}, 5000)
			return (true)
		} catch (exception) {
			setNotification({ info: 'Blog saving failed. Please enter all fields.', state: 'error' })
			setTimeout(() => {
				setNotification(null)
			}, 5000)
			return (false)
		}
	}

	return (
		<div>
			{notification && <Notification message={notification} />}

			{user === null && <LoginForm setUser={setUser} setNotification={setNotification} />}
			{user !== null &&
				<div>
					<h2>Blogs</h2>
					<p>{user.name} logged in
						<button
							type="submit"
							style={{ marginLeft: '10px' }}
							onClick={() => {
								window.localStorage.removeItem('loggedInUser')
								blogService.setToken(null)
								setUser(null)
							}}>
							logout
						</button>
					</p>
					<Togglable buttonLabel="new blog">
						<BlogForm createBlog={createBlog} />
					</Togglable>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
					)}
				</div>
			}
		</div>
	)
}

export default App