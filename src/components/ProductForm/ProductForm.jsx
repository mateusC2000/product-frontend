import { useState, useEffect } from 'react';
import './ProductForm.css';

const ProductForm = ({ 
  onClose, 
  onSave, 
  productToEdit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sku: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price,
        sku: productToEdit.sku
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = productToEdit 
        ? `http://localhost:3000/api/v1/products/${productToEdit.id}`
        : 'http://localhost:3000/api/v1/products';

      const method = productToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: {
            ...formData,
            price: parseFloat(formData.price)
          }
        })
      });

      if (!response.ok) throw new Error('Erro ao salvar produto');
      
      const savedProduct = await response.json();
      onSave(savedProduct);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Fechar">
          &times;
        </button>
        
        <h2>{productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome do Produto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength="2"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Preço (R$)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="sku">Código SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              pattern="[A-Za-z0-9]+"
              title="Apenas letras e números"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="button-loader"></span>
            ) : (
              productToEdit ? 'Salvar Alterações' : 'Adicionar Produto'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;