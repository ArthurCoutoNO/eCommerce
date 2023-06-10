// Função para obter os produtos da Fake Store API
async function getProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erro ao obter os produtos:', error);
    return [];
  }
}

// Função para exibir os produtos na Home-Page
async function showProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  const products = await getProducts();
  const randomProducts = getRandomProducts(products, 16); // Seleciona 16 produtos aleatórios

  randomProducts.forEach(product => {
    const productItem = createProductItem(product);
    productList.appendChild(productItem);
  });
}

function createProductItem(product) {
  const productItem = document.createElement('div');
  productItem.classList.add('productItem');

  const productImage = document.createElement('img');
  productImage.classList.add('productImage');
  productImage.src = product.image;
  productItem.appendChild(productImage);

  const productName = document.createElement('h3');
  productName.textContent = product.title;
  productItem.appendChild(productName);

  const productRating = document.createElement('p');
  productRating.textContent = `Rating: ${product.rating.rate} (${product.rating.count} avaliações)`;
  productItem.appendChild(productRating);

  const productPrice = document.createElement('p');
  productPrice.textContent = `Preço: R$ ${product.price.toFixed(2)}`;
  productItem.appendChild(productPrice);

  const detailsLink = document.createElement('a');
  detailsLink.textContent = 'Detalhes';
  detailsLink.href = `detalhes.html?id=${product.id}`; // Adiciona o ID do produto na URL
  productItem.appendChild(detailsLink);

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Adicionar ao Carrinho';
  productItem.appendChild(addToCartButton);

  addToCartButton.addEventListener('click', () => {
    addToCart(product);
  });

  return productItem;
}

// Função para selecionar produtos aleatórios sem repetição
function getRandomProducts(products, count) {
  const randomProducts = [];
  const totalProducts = products.length;
  const availableProducts = [...products];

  for (let i = 0; i < count; i++) {
    if (availableProducts.length === 0) {
      break;
    }

    const randomIndex = Math.floor(Math.random() * availableProducts.length);
    const randomProduct = availableProducts.splice(randomIndex, 1)[0];
    randomProducts.push(randomProduct);
  }

  return randomProducts;
}

// Função para adicionar um produto ao carrinho
function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Atualizar o número de itens no carrinho
  const cartItemCount = document.getElementById('cartItemCount');
  cartItemCount.textContent = getCartItemCount();
}


// Função para obter a quantidade de itens no carrinho
function getCartItemCount() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  return cartItems.length;
}

// Chame a função showProducts() para exibir os produtos aleatórios na página principal
showProducts();

document.addEventListener('DOMContentLoaded', () => {
  const searchLink = document.getElementById('searchLink');
  searchLink.addEventListener('click', () => {
    window.location.href = 'pesquisa.html';
  });
});
