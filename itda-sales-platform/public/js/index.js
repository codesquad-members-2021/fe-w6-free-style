//글로벌 import
import './sidebar.js';
import './cart.js';
import fetchProducts from './fetchProducts.js';

const init = async () => {
    const products = await fetchProducts();
};

window.addEventListener('DOMContentLoaded', init);
