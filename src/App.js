import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import User from './components/users/User';
import GithubState from './context/github/GithubState';



const App = () => {
	const [alert, setAlert] = useState(null)

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
							<Route exact path='/' component={Home} />
							<Route exact path='/about' component={About} />
							<Route exact path='/user/:login' component={User} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	)
}






export default App;
