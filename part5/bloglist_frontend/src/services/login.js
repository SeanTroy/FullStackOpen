import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
const loginService = { login }

export default loginService