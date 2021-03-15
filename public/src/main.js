const url = location.search;
console.log(url);

fetch(url).then(console.log);
