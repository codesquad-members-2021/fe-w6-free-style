const _ = {
    $: (selector) => document.querySelector(selector),
    $all: (selector) => document.querySelectorAll(selector),
    $create: (selector) => document.createElement(selector),
    addHTML: (node, variable) => { return node.innerHTML = variable },
    addClass: (node, ...className) => node.classList.add(...className),
    removeClass: (node, ...className) => node.classList.remove(...className),
    contains: (node, className) => node.classList.contains(className),
    append: (node, variable) => node.append(variable),
    nodeCount: (node) => node.childElementCount
}

 const DOM = {
    chat : _.$("#chat"),
    name : _.$("#name"),
    message : _.$("#message"),
    chatLog : _.$(".chatLog"),
    right_speech_bubble : _.$(".right_speech_bubble"),
    user_name : _.$all(".user_name"),
    user_name_list : _.$(".user_name_list")
}

const CLASS_LIST = {
    float_right : "float_right"
}

const delay = (data, ms) => new Promise((resolve) => setTimeout(()=> resolve(data), ms));

export { _, DOM, CLASS_LIST, delay };