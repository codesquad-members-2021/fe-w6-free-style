//------------------------✻✻✻ 장바구니 페이지 ✻✻✻--------------------------
import { _ } from '../utill.js';

const cartOverlay = _.$('.cart-overlay');
const closeCartBtn = _.$('.cart-close');
const toggleCartBtn = _.$('.toggle-cart');

_.addEvent(toggleCartBtn, 'click', () => _.addClass(cartOverlay, "show"));
_.addEvent(closeCartBtn, 'click', () => _.removeClass(cartOverlay, "show"));

const openCart = () => _.addClass(cartOverlay, 'show');
const addToCart = (id) => openCart();
export { openCart, addToCart };