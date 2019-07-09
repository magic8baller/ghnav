import React, {useReducer} from 'react';
import GithubContext from './githubContext';
import githubReducer from './githubReducer';
// import {SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS} from '../types'

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		isLoading: false
	}

	const [state, dispatch] = useReducer(githubReducer, initialState);

	return <GithubContext.Provider
		value={{
			users: state.users,
			user: state.user,
			repos: state.repos,
			isLoading: state.isLoading
		}}>
		{props.children}
	</GithubContext.Provider>

}

export default GithubState;