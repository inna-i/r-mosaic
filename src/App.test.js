import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders app title', () => {
	render(<App />);
	const linkElement = screen.getByText(/Mosaic generator/i);
	expect(linkElement).toBeInTheDocument();
});
