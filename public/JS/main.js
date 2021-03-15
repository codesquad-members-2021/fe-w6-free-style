import { _ } from "./util.js";

const wheelData = {
	canvas: _.$(".roulette__circle"),
	xLocation: 155,
	yLocation: 155,
	radius: 135,
	plusButton: _.$(".roulette__controller--plus-button"),
	minusButton: _.$(".roulette__controller--minus-button"),
	rollButton: _.$(".roulette__controller--roll-button"),
	countPizza: _.$(".roulette__controller--count"),
};

class Roulette {
	constructor(data) {
		this.sumPizza = 3;
		this.data = data;
		this.ctx = data.canvas.getContext("2d");
		this.drawWheel();
        this.addEvent();
	}

	drawWheel() {
		const color = ["lightcoral", "powderblue", "khaki", "palegreen"];
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

	plusPizza() {
		this.resetRotate();
		this.sumPizza = this.sumPizza >= 4 ? 4 : ++this.sumPizza;
        this.data.countPizza.innerHTML = this.sumPizza;
        console.log(this.sumPizza)
		this.drawWheel();
	}
    
	minusPizza() {
		this.resetRotate();
        this.sumPizza = this.sumPizza <= 2 ? 2 : --this.sumPizza;
        this.data.countPizza.innerHTML = this.sumPizza;
        console.log(this.sumPizza)
		this.drawWheel();
	}

    rotate(){
		this.resetRotate()
        this.data.canvas.style.transform = 'rotate(4500deg)'
		this.data.canvas.style.transition = '3000ms'
    }
	
	resetRotate(){
		this.data.canvas.style.transform = 'rotate(0)'
		this.data.canvas.style.transition = '0ms'
	}

	대충글씨쓰기(){
		//대충 버튼 누르면 input값들 gist 차트그리기 참고해서 ctx에 새로그리기
	}

	addEvent() {
		_.E(this.data.plusButton, "click", this.plusPizza.bind(this));
		_.E(this.data.minusButton, "click", this.minusPizza.bind(this));
		_.E(this.data.rollButton, "click", this.rotate.bind(this));
	}
}
new Roulette(wheelData);
