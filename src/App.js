import axios from 'axios';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';
class App extends React.Component {
	constructor () {
		super()
		this.state = {
			users: [],
			user: {},
			isLoading: true,
			alert: null
		}
	}
	async componentDidMount () {
		const {REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET} = process.env
		const mountedRes = await axios.get(`https://api.github.com/users?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`)
		this.setState({users: mountedRes.data, isLoading: false})

	}

	getUser = async (username) => {
		this.setState({isLoading: true})
		const {REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET} = process.env
		const userRes = await axios.get(`https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`)
		this.setState({user: userRes.data, isLoading: false})
	}
	clearSearchResults = () => {
		this.setState({users: [], isLoading: false})
	}

	setAlert = (message, type) => {
		this.setState({alert: {message, type}})

		setTimeout(() => {
			this.setState({alert: null})
		}, 5000);
	}

	searchUsers = async (text) => {
		const {REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET} = process.env
		const searchRes = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`)
		this.setState({users: searchRes.data.items, isLoading: false})

	};

	render () {
		const {state: {users, user, isLoading, alert}, getUser, searchUsers, clearSearchResults, setAlert} = this;
		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route exact path='/' render={props => (
								<>
									<Search clearSearchResults={clearSearchResults} searchUsers={searchUsers} showClear={users.length > 0} setAlert={setAlert} />
									{<Users users={users} isLoading={isLoading} />}
								</>
							)} />
							<Route exact path='/about' component={About} />
							<Route exact path='/user/:login' render={props => (
								<User {...props} getUser={getUser} user={user} isLoading={isLoading} />
							)} />
						</Switch>
					</div>
				</div>
			</Router>
		)
	}

}




export default App;
