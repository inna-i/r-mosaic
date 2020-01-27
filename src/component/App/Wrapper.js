import React from 'react';
import PropTypes from 'prop-types';
import { Layout, IconsProvider } from '@talend/react-components';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Welcome from './Welcome';

const Wrapper = props => (
	<div>
		<IconsProvider />
		<Layout
			hasTheme
			header={<Header />}
			mode="TwoColumns"
			one={<Sidebar />}
		>
			{!props.children ? <Welcome /> : props.children }
		</Layout>
	</div>
);

Wrapper.propTypes = {
	children: PropTypes.element,
};
export default Wrapper;
