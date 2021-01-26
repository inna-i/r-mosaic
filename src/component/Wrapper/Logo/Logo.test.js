import React from 'react';
import { shallow } from 'enzyme';

import Logo from '.';

describe('Logo  component', () => {
	it('should render Logo  component', () => {
		// when
		const wrapper = shallow(<Logo />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
