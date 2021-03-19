//------------------------✻✻✻ 필터링 로직 ✻✻✻--------------------------
import { _ } from './util.js';
import display from './display.js';

const setUpSearch = async (store) => {
    const form  = _.$('.input-form');
    const nameInput = _.$('.search-input');
    addSearchEvent(store, form, nameInput);
}

const addSearchEvent = async (store, form, nameInput) => {
    await _.addEvent(form, 'input', () => {
        const value = nameInput.value;
        const newStore = store.filter((product) => {
            let { name } = product;
            if(name.startsWith(value)) return product;
        })
       display(newStore, _.$('.products-container'));
    })
}


export { setUpSearch };