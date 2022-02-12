import { render, screen } from '@testing-library/react';
import Logo from '.';

test('renders Logo', () => {
	render(<Logo />);
	const logoElement = screen.getByText(/Logo/i);
	expect(logoElement).toBeInTheDocument();
});
