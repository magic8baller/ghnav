import React, {useContext} from 'react';
import GithubContext from '../../context/github/githubContext';
import Spinner from '../layout/Spinner';
import UserCard from './UserCard';

const Users = () => {
	const githubContext = useContext(GithubContext)
	const {isLoading, users} = githubContext
	const userList = users.map(user => <UserCard key={user.id} user={user} />)
	if (isLoading) {
		return <Spinner />
	} else {
		return (
			<div style={userStyle}>
				{userList}
			</div>
		)
	}
}


const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
}

export default Users