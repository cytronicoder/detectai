import { render, screen } from '@testing-library/react';
import App from './App';

test('renders project link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn more about the project/i);
  expect(linkElement).toBeInTheDocument();
});
