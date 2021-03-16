import { _ } from "./util.js";
import { Roulette } from "./roulette.js";
import { Separator } from "./separator.js";

const rouletteData = {
	canvas: _.$(".roulette__circle"),
	xLocation: 150,
	yLocation: 150,
	radius: 135,
	plusButton: _.$(".roulette__controller--plus-button"),
	minusButton: _.$(".roulette__controller--minus-button"),
	rollButton: _.$(".roulette__controller--roll-button"),
	setButton: _.$(".roulette__controller--set-button"),
	countPizza: _.$(".roulette__controller--count"),
	rouletteItem: _.$(".roulette__item"),
};

new Roulette(rouletteData);

const separatorData = {
	startButton: _.$(".input__start-button"),
	userList: _.$a("input", _.$(".input__user-list")),
	slideItems: _.$a(".slide-item"),
};

new Separator(separatorData);

// fetch("https://analytics.developer.riotgames.com/v1/event?pid=RGEA0002-32de3446-a2a6-4f9a-a387-f40138212b2b&did=c5c973bf-a4cb-4671-b03e-0bb93a0e0a62&sid=00c4312a-143a-467e-a422-a40a1f80de40&uts=1615858800462&lolpid=kr&dh=www.op.gg&dp=%2Fsummoner%2FuserName%3Dlosbulgogi&ul=ko-KR&utz=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%ED%91%9C%EC%A4%80%EC%8B%9C")
// .then((r)=>console.log(r));

// const userID = 'hide on bush'
// const APIKey = 'RGAPI-e7d95556-7758-4816-85bf-30901e3b7bc3'
// fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userID}?api_key=${APIKey}`)
