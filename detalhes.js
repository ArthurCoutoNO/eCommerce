document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
  
    if (productId) {
      getProductDetails(productId);
    }
  });
  
  async function getProductDetails(productId) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const product = await response.json();
      showProductDetails(product);
    } catch (error) {
      console.log('Erro ao obter os detalhes do produto:', error);
    }
  }
  
  function showProductDetails(product) {
    const productName = document.getElementById('productName');
    const productImage = document.getElementById('productImage');
    const productRating = document.getElementById('productRating');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');
  
    productName.textContent = product.title;
    productImage.src = product.image;
    productRating.textContent = `Rating: ${product.rating.rate} (${product.rating.count} avaliações)`;
    productPrice.textContent = `Preço: R$ ${product.price.toFixed(2)}`;
    productDescription.textContent = product.description;
  }
  