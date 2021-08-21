import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByTestId("tidHeader");
  expect(linkElement).toNotBeEmpty();
});
