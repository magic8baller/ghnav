import axios from 'axios';
import React, {useReducer} from 'react';
import {CLEAR_USERS, GET_USER, GET_USER_REPOS, SEARCH_USERS, SET_LOADING} from '../types';
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

		dispatch({type: SEARCH_USERS, payload: searchRes.data.items})
	}

	//GET USER
	const getUser = async username => {
		setLoading()

		const userRes = await axios.get(`https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`);

		dispatch({type: GET_USER, payload: userRes.data})

	}
	//CLEAR RESULTS
	const clearSearchResults = () => dispatch({type: CLEAR_USERS})
	// GET REPOS


	const getUserRepos = async (username) => {
		setLoading(true)
		const {REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET} = process.env
		const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`)
		dispatch({type: GET_USER_REPOS, payload: repoRes.data})
	}

	//set loading: dispatch to reducer pulled from useReducer hook
	// must have type, dontt need payload
	const setLoading = () => dispatch({type: SET_LOADING})


	return <GithubContext.Provider
		value={{
			users: state.users,
			user: state.user,
			repos: state.repos,
			isLoading: state.isLoading,
			searchUsers,
			getUser,
			clearSearchResults,
			getUserRepos
		}}>
		{props.children}
	</GithubContext.Provider>

}

export default GithubState;