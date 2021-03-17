export const _ = {
	ca: (target, className) => target.classList.add(className),

	cr: (target, className) => target.classList.remove(className),

	ct: (target, className) => target.classList.toggle(className),

	$: (selector, base = document) => base.querySelector(selector),

	$a: (selector, base = document) => base.querySelectorAll(selector),

	on: (target, type, listener, useCapture = false) => target.addEventListener(type, listener, useCapture),

	debounce: (func, delay) => {
		let timer;
		return function () {
			clearTimeout(timer);
			timer = setTimeout(func, delay);
		};
	},

	delay: (func, time) =>
		new Promise((res, rej) => {
			setTimeout(() => {
				func();
				res();
			}, time);
		}),
};
