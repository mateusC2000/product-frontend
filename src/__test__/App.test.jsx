import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, name: 'Caneta', price: 3.5, sku: 'C123' },
          { id: 2, name: 'Lápis', price: 2.0, sku: 'L456' },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders the main App component and product list', async () => {
  render(<App />);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Gerenciamento de Produtos/i)).toBeInTheDocument();
    expect(screen.getByText(/Caneta/)).toBeInTheDocument();
    expect(screen.getByText(/Lápis/)).toBeInTheDocument();
  });
});
