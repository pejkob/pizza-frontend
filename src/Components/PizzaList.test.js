import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PizzaListPage from './PizzaListPage';

describe('PizzaListPage', () => {
    test('fetches and renders pizzas', async () => {
        const mockPizzas = [
            { id: 1, name: 'Margarita', isGlutenFree: false, kepURL: 'https://example.com/image1.jpg' },
            { id: 2, name: 'Pepperoni', isGlutenFree: true, kepURL: 'https://example.com/image2.jpg' }
        ];

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(mockPizzas)
        });

        render(
            <MemoryRouter>
                <PizzaListPage />
            </MemoryRouter>
        );

        expect(await screen.findByText('Margarita')).toBeInTheDocument();
        expect(await screen.findByText('Pepperoni')).toBeInTheDocument();
    });

    test('displays spinner while fetching', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: () => new Promise(() => {}) // Simulate slow response
        });

        render(
            <MemoryRouter>
                <PizzaListPage />
            </MemoryRouter>
        );

        expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    });

    test('renders edit and delete links', async () => {
        const mockPizzas = [{ id: 1, name: 'Margarita', isGlutenFree: false }];

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(mockPizzas)
        });

        render(
            <MemoryRouter>
                <PizzaListPage />
            </MemoryRouter>
        );

        expect(await screen.findByRole('mod-pizza-link')).toHaveAttribute('href', '/mod-pizza/1');
        expect(await screen.findByRole('del-pizza-link')).toHaveAttribute('href', '/del-pizza/1');
    });
});





