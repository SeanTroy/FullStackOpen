import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	}
	try {
		const response = await axios.post(baseUrl, newObject, config)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

const update = async (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	}
	try {
		const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

const remove = async id => {
	const config = {
		headers: { Authorization: token },
	}
	try {
		const response = await axios.delete(`${baseUrl}/${id}`, config)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

const blogService = { getAll, create, setToken, update, remove }
export default blogService