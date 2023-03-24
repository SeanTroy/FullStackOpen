const Notification = ({ message }) => {

	let notificationStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}

	if (message === null) {
		return null
	}

	if (message.state === 'error') {
		notificationStyle.color = 'red'
	}

	return (
		<div style={notificationStyle}>
			{message.info}
		</div>
	)
}

export default Notification