import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders correctly', async () => {
    render(<App />);
    jest.runAllTimers();

    expect(screen.getByRole('heading')).toHaveTextContent(
      /react typescript starter kit - test/i
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
    await waitFor(() => expect(screen.getByText('true')).toBeInTheDocument());
  });
});
