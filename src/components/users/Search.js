import React, {useContext, useState} from 'react';
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/github/githubContext';
const Search = () => {
	const githubContext = useContext(GithubContext)
	const alertContext = useContext(AlertContext)

	const [text, setText] = useState('')

	const handleChange = (e) => setText(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (text === '') {
			alertContext.setAlert('Please enter something', 'light')
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
			{githubContext.users.length > 0 && (<button className="btn btn-light btn-block" onClick={githubContext.clearSearchResults}>Clear</button>)}
		</div>
	)
}

export default Search