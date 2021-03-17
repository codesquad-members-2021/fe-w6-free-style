import { _ } from "./util.js";
export class Separator {
	constructor(data) {
		this.data = data;
		this.init();
	}

	separateUser() {
		const index = new Set();
		while (index.size < 10) index.add(Math.floor(Math.random() * 10));
		const indexArr = [...index];
		this.data.slideItems.forEach((v, i) => {
			v.innerHTML = this.data.userList[indexArr[i]].value;

			fetch(`/users/?userID=${this.data.userList[indexArr[i]].value}`)
			.then((v) => v.json())
			.then((response) =>
				response.forEach((e) => {
					if (e.queueType === "RANKED_SOLO_5x5") {
						v.innerHTML += `: ${e.tier} - ${e.rank}`;
						status = "on"
					} 
					console.log(e)
				})
			);
		});
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
