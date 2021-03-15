// 제이슨 데이터를 만들어서 보내줘야함.
// const allProductsUrl = 'https://course-api.com/javascript-store-products'
// // 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
// const singleProductUrl =
//   'https://course-api.com/javascript-store-single-product'

//querySelector 쓰면 안됌. DOM tree 탐색하는 로직으로 바꾸기.
const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`"${selector}"에 해당하는 요소가 없음, 다시 확인 바람.`);
}

const formatPrice = () => {}
const getStorageItem = () => {}
const setStorageItem = () => {}

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
}
