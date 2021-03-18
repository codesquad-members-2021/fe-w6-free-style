//글로벌 import
import './sidebar.js';
import './cart.js';
import fetchProducts from './fetchProducts.js';
import { setupStore, store } from './store.js';
import { _ } from './utill.js';
import display from './display.js';

const init = async () => {
    //products 데이터 띄우기
    const products = await fetchProducts();
    const featured = store.filter((product) => product.featured === true);
    setupStore(products);
    display(featured, _.$('.featured-center'));
};

window.addEventListener('DOMContentLoaded', init);
