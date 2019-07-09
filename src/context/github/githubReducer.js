// any changes going thru state
import {SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS} from '../types';

export default (state, action) => {
	switch(action.type) {
		case SEARCH_USERS:
			return {...state, users: action.payload, isLoading: false};
		case SET_LOADING:
			return {...state, isLoading: true};
		case CLEAR_USERS:
			return {...state,};
		case GET_USER:
			return {...state,};
		case GET_REPOS:
			return {...state,};
		default:
			return state;
	}
}