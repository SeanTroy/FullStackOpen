import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		changeNotification(state, action) {
			const content = action.payload
			return content
		}
	},
})

export const { changeNotification } = notificationSlice.actions

export const setNotification = (content, duration) => {
	return async dispatch => {
		dispatch(changeNotification(content))
		setTimeout(() => {
			dispatch(changeNotification(''))
		}, duration * 1000)
	}
}

export default notificationSlice.reducer
