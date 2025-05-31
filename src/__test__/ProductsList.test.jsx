import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductsList from '../components/ProductsList/ProductList';

describe('ProductsList', () => {
  const mockProducts = [
    { id: 1, name: 'Caneta', price: 3.5, sku: 'C123', missing_letter: 'A' },
    { id: 2, name: 'Lápis', price: 2.0, sku: 'L456', missing_letter: 'B' },
  ];

  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/v1/products')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        });
      }
    });
  });

  it('loads and displays the product list', async () => {
    render(<ProductsList />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Caneta/)).toBeInTheDocument();
      expect(screen.getByText(/Lápis/)).toBeInTheDocument();
    });
  });

  it('opens the form when clicking on "Add New Product"', async () => {
    render(<ProductsList />);
    await waitFor(() => screen.getByText(/Caneta/));

    fireEvent.click(screen.getByRole('button', { name: /Adicionar Novo Produto/i }));

    expect(screen.getByRole('heading', { name: /Adicionar Novo Produto/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/Nome do Produto/i)).toBeInTheDocument();
  });

  it('opens confirmation modal when clicking delete', async () => {
    render(<ProductsList />);
    await waitFor(() => screen.getByText(/Caneta/));

    fireEvent.click(screen.getAllByText(/Excluir/i)[0]);

    expect(screen.getByText(/Confirmar Exclusão/)).toBeInTheDocument();
  });
});
