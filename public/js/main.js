console.log("hi there");

const body = {
  sidoName: "서울",
};

fetch("http://localhost:3000/city", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})
  .then((res) => res.json())
  .then((result) => console.table(result.list[0]));
