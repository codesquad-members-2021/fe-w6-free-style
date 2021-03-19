//------------------------✻✻✻ 필터링 로직 ✻✻✻--------------------------
import { _ } from './util.js';
import display from './display.js';

const container = _.$('.products-container');
const noResult = `<h3 class="filter-error">죄송합니다, 일치하는 결과가 없습니다. 🙅🏻‍♀️</h3>`;

const setUpSearch = async (store) => {
    const form  = _.$('.input-form');
    const nameInput = _.$('.search-input');
    lookUpProduct(store, form, nameInput);
}

const hasMatchedVal = (newStore) => {
    return newStore.length >= 1 ? true : false;
}

const showResult = (newStore, container) => {
    hasMatchedVal(newStore) ? display(newStore, container) : container.innerHTML = noResult;
}

const filterStoreByInput = (store, value) => {
    return store.filter((el) => {
        let { name } = el;
        if(name.startsWith(value)) return el;
    })
}

const filterStoreBySeller = (ev, store) => {
    const selectedEl = ev.target;
    let newStore;
    if(selectedEl.classList.contains('company-btn')){
        selectedEl.textContent === '모두 보기' ? newStore = store : newStore = store.filter((el) => el.company === selectedEl.textContent);
        display(newStore, container);
    }
}

const lookUpProduct = async (store, form, nameInput) => {
    await _.addEvent(form, 'input', () => {
        const inputValue = nameInput.value;
        const newStore = filterStoreByInput(store, inputValue);
        showResult(newStore, container);
    })
}

const makeSellerTemplate = (sellers) => {
    return sellers.reduce((acc, seller) => acc += `<button class="company-btn">${seller}</button>`, '');
}

const setUpSellers = (store) => {
    let sellers = ["모두 보기", ...new Set(store.map((el) => el.company))];
    const sellerDOM = _.$('.companies');
    sellerDOM.innerHTML = makeSellerTemplate(sellers);
    _.addEvent(sellerDOM, 'click', (e) => {filterStoreBySeller(e, store)});
};

export { setUpSearch, setUpSellers };