import { _ } from "./util.js";
export class Separator {
	constructor(data) {
		this.data = data;
		this.init();
	}

	init() {
		_.on(this.data.startButton, "click", this.start.bind(this));
	}

	async start() {
		this.data.startButton.disabled = "true";
		this.resetSlide();
		await this.separateUser();
		await this.slide();
		this.data.startButton.disabled = "";
	}

	resetSlide() {
		this.data.slideItems.forEach((v) => {
			_.cr(v, "slide-right");
			_.cr(v, "slide-left");
		});
	}

	separateUser() {
		return this.renderUser(this.getRandomIndex(10));
	}

	getRandomIndex(length) {
		const index = new Set();
		while (index.size < length) index.add(Math.floor(Math.random() * length));
		return [...index];
	}
	//prettier-ignore
	renderUser(randomIndex) {
		const promiseArr = [...this.data.slideItems].map((v, i) =>new Promise(async (res, rej) => {
				v.innerHTML = `<div>${this.data.userList[randomIndex[i]].value}</div>`;
				let userInfo = await this.getUserInfo(this.data.userList[randomIndex[i]].value);
				v.innerHTML += `<div><img src="./images/${userInfo.tier}.png" alt="tier-icon"> - ${userInfo.rank} - ${userInfo.leaguePoints}</div>`;
				res();
			})
		);
		return Promise.all(promiseArr);
	}

	getUserInfo(userID) {
		const defaultInfo = {
			tier: "UNRANKED",
			rank: "",
			leaguePoints: "",
			win: 0,
			lose: 0,
		};
		return fetch(`/users/?userID=${userID}`)
			.then((response) => response.json())
			.then((response) => response.find((e) => e.queueType === "RANKED_SOLO_5x5"))
			.then((response) => (response ? response : defaultInfo));
	}

	slide() {
		return new Promise(async (res, rej) => {
			for (let i = 0; i < 5; i++) {
				await _.delay(() => _.ca(this.data.slideItems[i], "slide-right"), 300);
				await _.delay(() => _.ca(this.data.slideItems[i + 5], "slide-left"), 300);
			}
			res();
		});
	}
}
