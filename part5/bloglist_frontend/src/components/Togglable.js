import { useState } from "react";

const Togglable = (props) => {
	const [visible, setVisible] = useState(false)

	const hideWithForm = { display: visible ? "none" : "", marginBottom: '10px' }
	const showWithForm = { display: visible ? "" : "none", marginBottom: '10px' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<>
			<div style={hideWithForm}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWithForm}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</>
	)
}

export default Togglable