import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { PizzaModPage } from './PizzaModPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ pizzaid: '5' }),
  useNavigate: jest.fn(), // Mocking useNavigate
}));

describe('PizzaModPage Component', () => {
  // Mocking global fetch
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
    });
  });

  // Cleanup mock
  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('submits form correctly', async () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <Router>
        <PizzaModPage />
      </Router>
    );

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Trigger form submission
    fireEvent.submit(getByText('Küldés'));

    // Verify that fetch is called with correct parameters
    expect(fetch).toHaveBeenCalledWith('https://pizza.kando-dev.eu/Pizza/5', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 5, // Use the correct pizza ID
        name: 'string', // Assuming the default name is "string"
        isGlutenFree: 0, // Assuming 0 is represented as false for gluten-free
        kepURL: 'string', // Assuming the default URL is "string"
      }),
    });

    // Verify that navigate function is called after successful form submission
    expect(useNavigate).toHaveBeenCalledWith('/');
  });
});
