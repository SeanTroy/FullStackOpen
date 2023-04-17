import { useState, useEffect, useRef } from 'react'
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
	const blogFormRef = useRef()

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
		const returnedBlog = await blogService.create(newBlog)
		if (returnedBlog.error) {
			setNotification({ info: returnedBlog.error, state: 'error' })
			setTimeout(() => {
				setNotification(null)
			}, 5000)
		} else {
			returnedBlog.user = { username: user.username }
			setBlogs(blogs.concat(returnedBlog))
			blogFormRef.current.toggleVisibility()
			setNotification({ info: `A new blog ${newBlog.title} by ${newBlog.author} added.`, state: 'success' })
			setTimeout(() => {
				setNotification(null)
			}, 5000)
			return (true)
		}
	}

	const likeBlog = async (blog, liked) => {
		if (liked) {
			const response = await blogService.update(blog.id, { ...blog, likes: blog.likes - 1 })
			if (!response.error) {
				const updatedBlogs = blogs.map(b =>
					b.id === blog.id
						? { ...b, likes: b.likes - 1, liked_users: b.liked_users.filter(u => u.username !== user.username) }
						: b
				)
				setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
			}
		}
		else {
			const response = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
			if (!response.error) {
				const updatedBlogs = blogs.map(b =>
					b.id === blog.id
						? { ...b, likes: b.likes + 1, liked_users: b.liked_users.concat(user) }
						: b
				)
				setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
			}
		}
	}

	const deleteBlog = async (blog) => {
		if (window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author}?`)) {
			const response = await blogService.remove(blog.id)
			if (response.error) {
				setNotification({ info: response.error, state: 'error' })
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			} else {
				const updatedBlogs = blogs.filter(b => b.id !== blog.id)
				setBlogs(updatedBlogs)
				setNotification({ info: `Blog ${blog.title} by ${blog.author} removed.`, state: 'success' })
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			}
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
							id="logoutbutton"
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
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogForm createBlog={createBlog} />
					</Togglable>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
					)}
				</div>
			}
		</div>
	)
}

export default App