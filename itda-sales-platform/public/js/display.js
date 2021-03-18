
const makeProductTemplate = (id, name, image, price) => {
    return `<article class="product">
        <div class="product-container">
            <img src="${image}" class="product-img img" alt="${name}">
            <div class="product-icons">
                <a href="product.ejs?id=${id}" class="product-icon">
                    <i class="fas fa-search"></i>
                </a>
                <button class="product-cart-btn product-icon" data-id="${id}">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
        <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">$${price}원</h4>
        </footer>
    </article>`;
}

const display = (products, element) => {
    element.innerHTML = products.map((product) => {
        const { id, name, image, price } = product;
        return makeProductTemplate(id, name, image, price);
    }).join('');
}

export default display;