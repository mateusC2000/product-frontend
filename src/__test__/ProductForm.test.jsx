import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../components/ProductForm/ProductForm';

describe('ProductForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  it('correctly renders empty form for new product', () => {
    render(<ProductForm onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByLabelText(/Nome do Produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Código SKU/i)).toHaveValue('');
  });

  it('fill in the form with data when editing the product', () => {
    const product = { name: 'Caneca', price: '25.99', sku: 'ABC123' };

    render(
      <ProductForm 
        onClose={mockOnClose} 
        onSave={mockOnSave} 
        productToEdit={product} 
      />
    );

    expect(screen.getByDisplayValue('Caneca')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25.99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ABC123')).toBeInTheDocument();
  });

  it('submit the form with correct values', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: 'Teste', price: 10, sku: 'SKU1' }),
      })
    );

    render(<ProductForm onClose={mockOnClose} onSave={mockOnSave} />);

    fireEvent.change(screen.getByLabelText(/Nome do Produto/i), {
      target: { value: 'Produto Teste', name: 'name' }
    });
    fireEvent.change(screen.getByLabelText(/Preço/i), {
      target: { value: '10.00', name: 'price' }
    });
    fireEvent.change(screen.getByLabelText(/Código SKU/i), {
      target: { value: 'SKU1', name: 'sku' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Adicionar Produto/i }));

    expect(await screen.findByRole('button', { name: /adicionar produto/i })).toBeEnabled();
    expect(mockOnSave).toHaveBeenCalled();
  });
});
