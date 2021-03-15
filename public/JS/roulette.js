import { _ } from "./util.js";
export class Roulette {
	constructor(data) {
		this.data = data;
		this.ctx = data.canvas.getContext("2d");
		this.sumPizza = 3; //초기html렌더링시 설정된 조각 개수
		this.maxPizza = 5;
		this.deg = 0; // 초기각도
		this.init();
	}

	init() {
		this.drawWheel();
		this.addEvent();
	}

	drawWheel() {
		const color = ["lightcoral", "powderblue", "khaki", "palegreen", "peachpuff"];
		let lastLocation = 0;
		for (let i = 1; i <= this.sumPizza; i++) {
			this.ctx.beginPath();
			this.ctx.lineTo(this.data.xLocation, this.data.yLocation);
			this.ctx.arc(this.data.xLocation, this.data.yLocation, this.data.radius, lastLocation, lastLocation + (2 * Math.PI) / this.sumPizza);
			this.ctx.lineTo(this.data.xLocation, this.data.yLocation);
			this.ctx.fillStyle = color[i - 1];
			this.ctx.fill();
			lastLocation = lastLocation + (2 * Math.PI) / this.sumPizza;
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	drawItem() {
		const items = [..._.$A("input", this.data.rouletteItem)].map((e) => e.value);
		console.log(items);
		const modifier = Math.PI / this.sumPizza;
		const maxWidth = 80 + 60 / this.sumPizza;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "black";
		items.forEach((v, i) => {
			let x = this.data.xLocation + this.data.radius * 0.6 * Math.cos(((2 * Math.PI) / this.sumPizza) * i + modifier);
			let y = this.data.xLocation + this.data.radius * 0.6 * Math.sin(((2 * Math.PI) / this.sumPizza) * i + modifier);
			this.ctx.beginPath();
			this.ctx.fillText(v, x, y, maxWidth);
			this.ctx.closePath();
		});
	}

	plusPizza() {
		this.resetRotate();
		this.sumPizza = this.sumPizza >= this.maxPizza ? this.maxPizza : ++this.sumPizza;
		this.data.countPizza.innerHTML = this.sumPizza;
		this.setItemInput();
		this.drawWheel();
	}

	minusPizza() {
		this.resetRotate();
		this.sumPizza = this.sumPizza <= 2 ? 2 : --this.sumPizza;
		this.data.countPizza.innerHTML = this.sumPizza;
		this.setItemInput();
		this.drawWheel();
	}

	setItemInput() {
		let html = "";
		for (let i = 0; i < this.sumPizza; i++) html += '<li><input type="text"></li>';
		this.data.rouletteItem.innerHTML = html;
	}

	rotate() {
		this.deg += 3600 + Math.random() * 360; //각도 일정 이상시 초기화 필요할까?
		this.data.canvas.style.transform = `rotate(${this.deg}deg)`;
		this.data.canvas.style.transition = "3000ms";
	}

	resetRotate() {
		this.data.canvas.style.transition = "0ms";
		this.data.canvas.style.transform = "rotate(0)";
	}

	addEvent() {
		_.E(this.data.plusButton, "click", this.plusPizza.bind(this));
		_.E(this.data.minusButton, "click", this.minusPizza.bind(this));
		_.E(this.data.rollButton, "click", this.rotate.bind(this));
		_.E(this.data.setButton, "click", this.drawItem.bind(this));
	}
}
