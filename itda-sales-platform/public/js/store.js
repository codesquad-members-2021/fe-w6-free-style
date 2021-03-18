import { _ } from './utill.js';

let store = _.getStorageItem('store');

const setupStore = (products) => {
    store = products.map((product) => {
        //destructuring으로 필요한 것들만 가져오기
        const { id, fields: { featured, name, price, company, colors, image : img }} = product;
        const image = img[0].thumbnails.large.url;
        return { id, featured, name, price, company, colors, image };
    });
    //localstorage에 store배열 저장
    _.setStorageItem('store', store);
}


export { store, setupStore };