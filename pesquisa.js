document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
  
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase();
      searchProducts(searchTerm);
    });
  
    function searchProducts(searchTerm) {
      searchResults.innerHTML = '';
  
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
          const matchingProducts = data.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
          );
  
          matchingProducts.forEach(product => {
            const productItem = createProductItem(product);
            searchResults.appendChild(productItem);
          });
        })
        .catch(error => console.log('Erro ao obter os produtos:', error));
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
  
      return productItem;
    }
  });
  