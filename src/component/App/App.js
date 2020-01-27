import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import '@talend/bootstrap-theme/src/theme/theme.scss';

import './app.scss';
import Wrapper from './Wrapper';
import User from '../User/Info';
import UsersList from '../UsersList';
import Repos from '../User/Repos';
import store from '../../store';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
	<div className="t7">
		<Provider store={store}>
			<Router history={history}>
				<Route path="/" component={Wrapper} exact >
					<Route path="about" component={User} exact />
					<Route path="repos" component={Repos} exact />
					<Route path="users" component={UsersList} exact />
				</Route>
			</Router>
		</Provider>
	</div>
);


export default App;
