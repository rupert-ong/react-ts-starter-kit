import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

describe('<Counter />', () => {
  test('renders correctly', () => {
    render(<Counter />);
    expect(screen.getByRole('button')).toHaveTextContent(/count 0/i);
  });

  test('increments the counter when clicked', () => {
    render(<Counter />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/count 0/i);
    userEvent.click(button);
    expect(button).toHaveTextContent(/count 1/i);
  });
});
