# Product Manager Frontend

Esta é a interface web para gerenciamento de produtos. Ela permite **criar**, **editar**, **listar** e **excluir** produtos de forma simples e intuitiva.  
Ela se comunica com a aplicação backend já existente chamada [`product_api`](https://github.com/mateusC2000/products_api) por meio de requisições HTTP.

---

## 📦 Funcionalidades

- Listagem de produtos
- Criação de novos produtos
- Edição de produtos existentes
- Exclusão com confirmação
- Validação de campos de formulário
- Integração com o backend `product_api`
- Campo especial com a **letra faltante** do nome do produto (calculado pela API)

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- CSS Modules
- Fetch API
- Docker (ambiente de desenvolvimento)

---

## 🔗 Requisitos

- Ter o backend [`product_api`](https://github.com/seu-usuario/product_api) rodando em `http://localhost:3000`
- Node.js (caso não use o Docker)
- Docker e Docker Compose (opcional, recomendado)

---

## 🐳 Rodando com Docker

1. Certifique-se de que a API `product_api` está rodando localmente na porta `3000`
2. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/product-manager-frontend.git
   cd product-manager-frontend

### Suba o container:
- docker compose up --build

### Acesse no navegador:
- http://localhost:5173

## 💻 Rodando Localmente (sem Docker)
### Instale as dependências:
- npm install

### Inicie o projeto:
- npm run dev

### Acesse no navegador:
- http://localhost:5173

## 🌐 Estrutura de Comunicação
### A aplicação consome os seguintes endpoints da product_api:

| Método | Endpoint                  | Descrição               |
|--------|---------------------------|--------------------------|
| GET    | `/api/v1/products`        | Lista todos os produtos |
| POST   | `/api/v1/products`        | Cria um novo produto    |
| PUT    | `/api/v1/products/:id`    | Atualiza um produto     |
| DELETE | `/api/v1/products/:id`    | Exclui um produto       |
