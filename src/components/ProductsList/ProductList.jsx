import { useState, useEffect } from 'react';
import ProductForm from '../ProductForm/ProductForm';
import './ProductsList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/products');
      if (!response.ok) throw new Error('Erro ao carregar produtos');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = (savedProduct) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === savedProduct.id ? savedProduct : p
      ));
    } else {
      setProducts([...products, savedProduct]);
    }
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/products/${productToDelete.id}`, 
        { method: 'DELETE' }
      );
      
      if (!response.ok) throw new Error('Erro ao excluir produto');
      
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (err) {
      setError(err.message);
      setProductToDelete(null);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  if (isLoading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="products-container">
      <header className="products-header">
        <h1>Gerenciamento de Produtos</h1>
      </header>

      <main>
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>SKU</th>
              <th>Letra Faltante</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>R$ {product.price}</td>
                <td>{product.sku}</td>
                <td>{product.missing_letter}</td>
                <td>
                  <button 
                    className="action-button edit"
                    onClick={() => handleEditClick(product)}
                  >
                    Editar
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <button 
        className="add-product-button"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        Adicionar Novo Produto
      </button>

      {showForm && (
        <ProductForm 
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
          productToEdit={editingProduct}
        />
      )}

      {productToDelete && (
        <div className="modal-overlay" onClick={() => setProductToDelete(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-button" 
              onClick={() => setProductToDelete(null)}
              aria-label="Fechar"
            >
              &times;
            </button>
            
            <h2>Confirmar Exclusão</h2>
            
            <p>Tem certeza que deseja excluir o produto <strong>{productToDelete.name}</strong>?</p>
            
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setProductToDelete(null)}
              >
                Cancelar
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleDeleteProduct}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;