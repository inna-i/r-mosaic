import React from 'react';
import { shallow } from 'enzyme';

import Wrapper from './Wrapper';

describe('Wrapper  component', () => {
	it('should render Wrapper  component', () => {
		// when
		const wrapper = shallow(<Wrapper />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
