import { allProductsURL } from "./utill.js";

const fetchProducts = async () => {
    const response = await fetch(allProductsURL)
    .catch(err => console.log(err));
    debugger;
    return response;
}

export default fetchProducts;
