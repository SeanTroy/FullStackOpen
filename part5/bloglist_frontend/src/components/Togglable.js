import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWithForm = { display: visible ? 'none' : '', marginBottom: '10px' }
	const showWithForm = { display: visible ? '' : 'none', marginBottom: '10px' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		}
	})

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
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable