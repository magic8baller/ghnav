import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
class User extends Component {

	componentDidMount () {
		const {getUser, match} = this.props;
		getUser(match.params.login);
	}

	static propTypes = {
		isLoading: PropTypes.bool,
		user: PropTypes.object.isRequired,
		getUser: PropTypes.func.isRequired
	}
	render () {

		const {name, avatar_url, location, bio, blog, login, html_url, followers, following, company, public_repos, public_gists, hireable} = this.props.user;
		const {isLoading} = this.props;

		if (isLoading) return <Spinner />;

		return (
			<>
				<Link to='/' className='btn btn-light'>
					Return to Search
				</Link>
				Hireable: {' '}
				{hireable ? (<i className='fas fa-check text-success' />) : (<i className='fas fa-times-circle text-danger' />)}
				<div className="card grid-2">
					<div className="all-center">
						<img src={avatar_url} alt="avatar" className='round-img' style={{width: '150px'}} />
						<h1>{name}</h1>
						<p>Location: {location}</p>
					</div>
					<div>
						{bio && (<>
							<h3>Bio</h3>
							<p>{bio}</p>
						</>)}
						<a href={html_url} className='btn btn-dark my-1'>
							Visit Github Profile
					</a>
						<ul>
							<li>
								{login && (<>
									<strong>Username: </strong> {login}
								</>)}
							</li>
							<li>
								{company && (<>
									<strong>Company: </strong> {company}
								</>)}
							</li>
							<li>
								{blog && (<>
									<strong>Website: </strong> {blog}
								</>)}
							</li>
						</ul>
					</div>
				</div>
				<div className="card text-center">
					<div className="badge badge-primary">Followers: {followers}</div>
					<div className="badge badge-success">Following: {following}</div>
					<div className="badge badge-light">Public Repos: {public_repos}</div>
					<div className="badge badge-dark">Public Gists: {public_gists}</div>
				</div>
			</>
		)
	}
}

export default User;