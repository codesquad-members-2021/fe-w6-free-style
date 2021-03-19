import { allProductsURL } from "./util.js";

const fetchProducts = async () => {
    const response = await fetch(allProductsURL)
    .catch(err => console.log(err));
    return response ? response.json(): response;
}

export default fetchProducts;
