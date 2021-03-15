import { _ } from "./util.js";
import { Roulette } from "./roulette.js";

const wheelData = {
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

new Roulette(wheelData);
