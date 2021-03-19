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
	startButton: _.$(".user__start-button"),
	userList: _.$a("input", _.$(".user__list")),
	slideItems: _.$a(".slide-item"),
};

new Separator(separatorData);

// 토글 버튼 이벤트
_.on(_.$(".roulette__folder"), "click", () => _.ct(_.$(".roulette"), "unseen"));

// console.log(document.body.childNodes);
// console.log(document.body);

// const $ = () => {
	//className 속성과 classList 속성
	//대충 .childNodes로 계속 재귀 검색
	//없으면 쌩 return
	//쌩 return 후
// };
