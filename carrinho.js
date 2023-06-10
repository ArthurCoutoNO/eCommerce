document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
  
    // Função para obter os parâmetros da URL
    function getURLParams() {
      const searchParams = new URLSearchParams(window.location.search);
      const params = {};
      for (let [key, value] of searchParams) {
        params[key] = value;
      }
      return params;
    }
  
    // Função para exibir os itens do carrinho e o total do preço
    function showCartItems() {
      const params = getURLParams();
      const totalPriceValue = params.total || '0.00';
  
      cartItems.innerHTML = '';
      totalPrice.textContent = `Total: R$ ${totalPriceValue}`;
  
      const cartData = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      cartData.forEach(item => {
        const cartItem = createProductItem(item);
        cartItems.appendChild(cartItem);
      });
  
      // Calcular e exibir o total da compra
      const total = calculateTotal(cartData);
      totalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
  
    function createProductItem(product) {
        const productItem = document.createElement('div');
        productItem.classList.add('productItem');
      
        const productImage = document.createElement('img');
        productImage.classList.add('productImage');
        productImage.src = product.image;
        productItem.appendChild(productImage);
      
        const productInfo = document.createElement('div');
        productInfo.classList.add('productInfo');
      
        const productName = document.createElement('h3');
        productName.textContent = product.title;
        productInfo.appendChild(productName);
      
        const productRating = document.createElement('p');
        productRating.textContent = `Rating: ${product.rating.rate} (${product.rating.count} avaliações)`;
        productInfo.appendChild(productRating);
      
        const productPrice = document.createElement('p');
        productPrice.textContent = `Preço: R$ ${product.price.toFixed(2)}`;
        productInfo.appendChild(productPrice);
      
        productItem.appendChild(productInfo);
      
        const removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.textContent = 'Remover';
        productItem.appendChild(removeButton);
      
        removeButton.addEventListener('click', () => {
          removeFromCart(product);
          showCartItems();
        });
      
        return productItem;
      }      
  
    // Função para calcular o total da compra
    function calculateTotal(cartItems) {
      let total = 0;
      cartItems.forEach(item => {
        total += item.price;
      });
      return total;
    }
  
    // Função para remover um produto do carrinho
    function removeFromCart(product) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const productIndex = cartItems.findIndex(item => item.id === product.id);
      if (productIndex !== -1) {
        cartItems.splice(productIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    }
  
    // Chame a função para exibir os itens do carrinho
    showCartItems();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const checkoutButton = document.getElementById('checkoutButton');
  
    // Evento de clique no botão "Finalizar Compra"
    checkoutButton.addEventListener('click', () => {
      // Limpar o carrinho
      localStorage.removeItem('cartItems');
      cartItems.innerHTML = '';
  
      // Exibir mensagem de "Compra Finalizada" com emoji
      const message = document.createElement('p');
      message.textContent = 'Compra Finalizada 🎉';
      message.style.fontWeight = 'bold';
      message.style.fontSize = '20px';
      cartItems.appendChild(message);
    });
  });
  