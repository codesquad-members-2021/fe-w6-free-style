//------------------------✻✻✻ 필터링 로직 ✻✻✻--------------------------
import { _ } from './util.js';
import display from './display.js';

const setUpSearch = async (store) => {
    const form  = _.$('.input-form');
    const nameInput = _.$('.search-input');
    lookUpProduct(store, form, nameInput);
}

const hasMatchedVal = (newStore) => {
    return newStore.length >= 1 ? true : false;
}

const lookUpProduct = async (store, form, nameInput) => {
    const container = _.$('.products-container');
    await _.addEvent(form, 'input', () => {
        const value = nameInput.value;
        const newStore = store.filter((product) => {
            let { name } = product;
            if(name.startsWith(value)) return product;
        })
        if (hasMatchedVal(newStore)) {
            display(newStore, container);
        } else {
            container.innerHTML = `<h3 class="filter-error">죄송합니다, 일치하는 결과가 없습니다. 🙅🏻‍♀️</h3>`
        }
    })
}



export { setUpSearch };