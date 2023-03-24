const Notification = ({ message }) => {

	if (message === null) {
		return null
	}

	let notificationStyle = {
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
		<div style={notificationStyle}>
			{message.info}
		</div>
	)
}

export default Notification