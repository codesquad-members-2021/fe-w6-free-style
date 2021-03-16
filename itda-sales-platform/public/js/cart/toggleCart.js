import utill from '../utill.js';
const _ = utill;

const cartOverlay = _.$('.cart-overlay');
const closeCartBtn = _.$('.cart-close');
const toggleCartBtn = _.$('.toggle-cart');

_.addEvent(toggleCartBtn, 'click', () => _.addClass(cartOverlay, "show"));
_.addEvent(closeCartBtn, 'click', () => _.removeClass(cartOverlay, "show"));

const openCart = () => _.addClass(cartOverlay, 'show');

export { openCart };