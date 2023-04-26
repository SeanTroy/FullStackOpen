import { NotificationMessage } from "../types"

const Notification = ({ message }: { message: NotificationMessage | null }) => {

	if (message === null) {
		return null
	}

	const notificationStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}

	if (message.state === 'error') {
		notificationStyle.color = 'red'
	}

	return (
		<div style={notificationStyle} className='notification'>
			{message.info}
		</div>
	)
}

export default Notification