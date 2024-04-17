import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { PizzaDeletePage } from './PizzaDeletePage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ pizzaid: '5' }), // Provide the correct pizza ID
  useNavigate: jest.fn(), // Mocking useNavigate
}));

describe('PizzaDeletePage Component', () => {
  test('renders correctly', async () => {
    const { getByText, getByAltText } = render(
      <Router>
        <PizzaDeletePage />
      </Router>
    );

    // Verify loading state is initially shown
    expect(getByText('Pizza törlése')).toBeInTheDocument();
    expect(getByAltText('hiányzik a képed innen!')).toBeInTheDocument();
    expect(getByText('Mégsem')).toBeInTheDocument();
    expect(getByText('Törlés')).toBeInTheDocument();
  });

  test('submits form correctly', async () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <Router>
        <PizzaDeletePage />
      </Router>
    );

    // Mocking fetch for form submission
    global.fetch.mockResolvedValueOnce({
      ok: true,
    });

    // Trigger form submission
    fireEvent.submit(getByText('Törlés'));

    // Verify that fetch is called with correct parameters
    expect(fetch).toHaveBeenCalledWith('https://pizza.kando-dev.eu/Pizza/5', {
      method: 'DELETE',
    });

    // Verify that navigate function is called after successful form submission
    expect(useNavigate).toHaveBeenCalledWith('/');
  });
});
