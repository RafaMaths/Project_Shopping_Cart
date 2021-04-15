function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createListItems() {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador')
  .then((response) => response.json())
  .then((info) => info.results.forEach((itemProduct) => {
    const product = {
        sku: itemProduct.id,
        name: itemProduct.title,
        image: itemProduct.thumbnail,
      };
      document.querySelector('.items').appendChild(createProductItemElement(product));
  }));
}

function buttonEvent() {
  const productButton = document.querySelectorAll('item__add');
  productButton.forEach((product) => {
    product.addEventListener('click', (addProduct) => {
      const id = getSkuFromProductItem(addProduct.target.parentNode);
      fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((response) => response.json)
      .then((list) => {
        const item = {
          id,
          name: list.title,
          salePrice: list.price,
        };
      });
    });
  });
}
  
// function buttonEvent() {
//   const productButton = document.querySelectorAll('item__add');
//   productButton.forEach((product) => {
//     product.addEventListener('click', (addProduct) => {
//       const id = getSkuFromProductItem(addProduct.target.parentNode); 
//       fetch(`https://api.mercadolibre.com/items/${id}`)
//       .then((response => response.json()));      
//     });
//   }
// }

window.onload = function onload() {
  createListItems();
  buttonEvent();
};
