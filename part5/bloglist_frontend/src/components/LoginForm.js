import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setUser, setErrorMessage }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			console.log('logging in with', username)
		} catch (exception) {
			setErrorMessage('User not found. Please check your credentials.')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	return (
		<>
			<h2>Log in to application:</h2>
			<form onSubmit={handleLogin}>
				<div>
					username:
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password:
					<input
						type="password"
						value={password}
						name="Password"
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	)
}

export default LoginForm