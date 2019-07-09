import PropTypes from 'prop-types';
import React, {useState} from 'react';
const Search = ({searchUsers, showClear, clearSearchResults, setAlert}) => {
	const [text, setText] = useState('')

	const handleChange = (e) => setText(e.target.value)


	const handleSubmit = (e) => {
		e.preventDefault()
		if (text === '') {
			setAlert('Please enter something', 'light')
		} else {
			searchUsers(text)
			setText('');
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="form">
				<input type="text" name='text' value={text} onChange={handleChange} placeholder='Search Users...' />
				<input type="submit" value='search' className='btn btn-dark btn-block' />
			</form>
			{showClear && (<button className="btn btn-light btn-block" onClick={clearSearchResults}>Clear</button>)}
		</div>
	)
}


Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearSearchResults: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired
}

export default Search