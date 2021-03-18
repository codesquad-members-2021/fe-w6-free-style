const PIXABAY_ENDPOINT = "https://pixabay.com/api/";

const API = {
  get: {
    randomImage: () => {
      const idx = parseInt(Math.random()*10-1);
      const queries = ["dog", "baby", "cat", "color", "game", "food", "travel", "toy", "sky", "coffee"];
      const result = fetch(`${PIXABAY_ENDPOINT}/?key=${process.env.PIXABAY_API_KEY}&q=${queries[idx]}&orientation=horizontal&image_type=photo`)
      .then(async (response) => {
          return await response.json();
        }
      )
      return result;
    }
  },
  post: {}
}

export default API;