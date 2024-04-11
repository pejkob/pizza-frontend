import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PizzaCreatePage from './PizzaCreatePage';

describe('PizzaCreatePage', () => {
    test('sends data to correct endpoint on form submission', async () => {
        const fetchMock = jest.fn().mockResolvedValueOnce();

        global.fetch = fetchMock;

        render(
            <MemoryRouter>
                <PizzaCreatePage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Pizza név:'), { target: { value: 'Margarita' } });
        fireEvent.change(screen.getByLabelText('Gluténmentes:'), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText('Kép URL-je:'), { target: { value: 'https://example.com/image.jpg' } });

        fireEvent.click(screen.getByText('Küldés'));

        expect(fetchMock).toHaveBeenCalledWith('https://pizza.kando-dev.eu/Pizza', {
            method: "POST",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                name: 'Margarita',
                isGlutenFree: "1",
                kepURL: 'https://example.com/image.jpg'
            })
        });
    });
});


