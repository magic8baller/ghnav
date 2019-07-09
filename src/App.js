import axios from 'axios';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';
import GithubState from './context/github/GithubState';


const App = () => {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})
	const [isLoading, setLoading] = useState(true)
	const [alert, setAlert] = useState(null)
	const [repos, setRepos] = useState([])

	const getUser = async (username) => {
		setLoading(true)
		const {REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET} = process.env
		const userRes = await axios.get(`https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`)
		setUser(userRes.data)
		setLoading(false)
	}

	const getUserRepos = async (username) => {
		setLoading(true)
		const {REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET} = process.env
		const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`)
		setRepos(repoRes.data)
		setLoading(false)
	}

	const clearSearchResults = () => {
		setUsers([])
		setLoading(false)
	}

	const showAlert = (message, type) => {
		setAlert({message, type})

		setTimeout(() => {
			setAlert(null)
		}, 5000);
	}



	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route exact path='/' render={props => (
								<>
									<Search clearSearchResults={clearSearchResults} showClear={users.length > 0} setAlert={showAlert} />
									{<Users users={users} isLoading={isLoading} />}
								</>
							)} />
							<Route exact path='/about' component={About} />
							<Route exact path='/user/:login' render={props => (
								<User {...props} getUser={getUser} user={user} isLoading={isLoading} getUserRepos={getUserRepos} repos={repos} />
							)} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	)
}






export default App;
