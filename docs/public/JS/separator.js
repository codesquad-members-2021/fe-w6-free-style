import {_} from './util.js'
export class Separator {
	constructor(data) {
		this.data = data;
		this.init();
	}

	separateUser() {
		const list = [...this.data.userList];
		this.data.slideItems.forEach((v, i) => (v.innerHTML = list.splice(Math.floor(Math.random() * (list.length - i)), 1)[0].value));
	}

	async slide() {
		for (let i = 0; i < 5; i++) {
			await _.delay(() => {
				_.ca(this.data.slideItems[i], "slide-right");
				_.ca(this.data.slideItems[i + 5], "slide-left");
			}, 200);
		}
	}

	resetSlide() {
		this.data.slideItems.forEach((v) => {
			_.cr(v, "slide-right");
			_.cr(v, "slide-left");
		});
	}

	start() {
		this.resetSlide();
		this.separateUser();
		this.slide();
	}

	init() {
		this.addEvent();
	}

	addEvent() {
		_.on(this.data.startButton, "click", this.start.bind(this));
	}
}
