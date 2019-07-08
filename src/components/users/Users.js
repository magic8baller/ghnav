import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../layout/Spinner';
import UserCard from './UserCard';

const Users = ({users, isLoading}) => {
	const userList = users.map(user => <UserCard key={user.id} user={user} />)

	return isLoading ? <Spinner /> : (
		<div style={userStyle}>
			{userList}
		</div>
	)
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired
}

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
}

export default Users