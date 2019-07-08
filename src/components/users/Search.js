import PropTypes from 'prop-types';
import React, {Component} from 'react';
class Search extends Component {

	state = {
		text: ''
	}

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearSearchResults: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired,
		// setAlert: PropTypes.func.isRequired
	}
	handleChange = (e) => {
		let {name, value} = e.target
		this.setState({[name]: value})
	}

	handleSubmit = (e) => {
		let {state: {text}, props: {setAlert, searchUsers}} = this;
		e.preventDefault()
		if (text === '') {
			setAlert('Please enter something', 'light')
		} else {
			searchUsers(text)
			this.setState({text: ''});
		}
	}


	render () {
		const {handleSubmit, handleChange, state: {text}, props: {clearSearchResults, showClear}} = this;
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
}


export default Search