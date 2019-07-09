import PropTypes from 'prop-types';
import React, {useState, useContext} from 'react';
import GithubContext from '../../context/github/githubContext'
const Search = ({ showClear, clearSearchResults, setAlert}) => {
	const githubContext = useContext(GithubContext)
	const [text, setText] = useState('')

	const handleChange = (e) => setText(e.target.value)


	const handleSubmit = (e) => {
		e.preventDefault()
		if (text === '') {
			setAlert('Please enter something', 'light')
		} else {
			githubContext.searchUsers(text)
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
	clearSearchResults: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired
}

export default Search