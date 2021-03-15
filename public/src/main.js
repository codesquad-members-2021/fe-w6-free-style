import { _ } from "./utils.js";

const request = async (url) => {
  const data = await fetch(url);
  return data;
};

const { types, scores } = request(_.search());
const scoreArr = scores.split("");
console.log(types, scoreArr);
