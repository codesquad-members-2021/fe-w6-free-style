var express = require("express");
var router = express.Router();
var axios = require("axios");
const { response } = require("express");

const APIKey = "RGAPI-bdab7472-d5e8-44f0-8482-a1687725e500";
/* GET users information. */
router.get("/", function (req, res, next) {
	const userID = req.query.userID; // query 뭘까
	axios.get(encodeURI(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userID}?api_key=${APIKey}`))
		.then((response) => axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.data.id}?api_key=${APIKey}`))
		.then((response) => res.send(response.data))//왜 fetch로는 안될까
    .catch((e)=>{
      console.log('API 호출 실패 : '+e)
      res.send([])
    })
});

module.exports = router;
