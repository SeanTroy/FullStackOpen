import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return action.content
		case 'RESET':
			return null
		default:
			return state
	}
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[1]
}

export const NotificationContextProvider = ({ children }) => {
	const [notification, dispatchNotification] = useReducer(notificationReducer, null)

	return (
		<NotificationContext.Provider value={[notification, dispatchNotification]}>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext