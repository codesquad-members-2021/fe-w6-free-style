//글로벌 import
import './sidebar.js';
import './cart.js';
import fetchProducts from './fetchProducts.js';
import { setupStore, store } from './store.js';

const init = async () => {
    //products 데이터 띄우기
    const products = await fetchProducts();
    setupStore(products);
};

window.addEventListener('DOMContentLoaded', init);
