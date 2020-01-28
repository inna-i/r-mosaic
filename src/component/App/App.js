import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Wrapper from '../Wrapper';

import './app.scss';


const App = () => (
	<Router history={browserHistory}>
		<Route path="/" component={Wrapper} exact />
	</Router>
);


export default App;
