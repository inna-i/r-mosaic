import React from 'react';
import { shallow } from 'enzyme';

import Welcome from './Welcome';

describe('Welcome component', () => {
	it('should render Welcome component', () => {
		// when
		const wrapper = shallow(<Welcome />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
