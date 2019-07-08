import React from 'react';
import spinner from './spinner.gif';
const Spinner = () => (
	<>
		<img src={spinner} alt='loading spinner' style={spinnerStyle} />
	</>
)

export default Spinner;

const spinnerStyle = {
	width: '200px',
	margin: 'auto',
	display: 'block'
}