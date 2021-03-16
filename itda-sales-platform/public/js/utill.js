//queryselector 쓰면 안된다. DFS로 돔 탐색하는 로직으로 바꾸기

const _ = {
    $: (selector) => document.querySelector(selector),
    $all: (selector) => document.querySelectorAll(selector),
    addClass: (node, className) => node.classList.add(className),
    removeClass: (node, className) => node.classList.remove(className),
    setToggle: (node, className) => node.classList.toggle(className),
    contains: (node, className) => node.classList.contains(className),
    removeTransform: (node, attributeName) => node.removeAttribute(attributeName),
    addEvent: (node, event, callback) => node.addEventListener(event, callback)
}

export default _;