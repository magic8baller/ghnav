import React, {useReducer} from 'react';
import {SEARCH_USERS, SET_LOADING} from '../types';
import axios from 'axios'
import GithubContext from './githubContext';
import githubReducer from './githubReducer';

const GithubState = props => {
	const {REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET} = process.env

	const initialState = {
		users: [],
		user: {},
		repos: [],
		isLoading: false
	}

	const [state, dispatch] = useReducer(githubReducer, initialState);

	//search users
	const searchUsers = async (text) => {
		//dispatches type of setLoading to reducer
		setLoading()
		const searchRes = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`)
		// setUsers(searchRes.data.items)
		dispatch({type: SEARCH_USERS, payload: searchRes.data})
	}

	//GET USER

	//CLEAR RESULTS

	// GET REPOS


	//set loading: dispatch to reducer pulled from useReducer hook
	// must have type, dontt need payload
	const setLoading = () => dispatch({type: SET_LOADING})


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