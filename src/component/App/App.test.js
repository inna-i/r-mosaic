import React from 'react';
import { mount } from 'enzyme';

import App from './App';

describe('App component', () => {
	it('should render App component', () => {
		const wrapper = mount(<App />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
