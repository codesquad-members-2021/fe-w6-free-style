const _ = {
    $: (selector) => document.querySelector(selector),
    $all: (selector) => document.querySelectorAll(selector),
    addClass: (node, ...className) => node.classList.add(...className),
    removeClass: (node, ...className) => node.classList.remove(...className),
    contains: (node, className) => node.classList.contains(className) 
}

 const DOM = {
    chat : _.$("#chat"),
    name : _.$("#name"),
    message : _.$("#message"),
    chatLog : _.$(".chatLog"),
    right_speech_bubble : _.$(".right_speech_bubble")
}

const CLASS_LIST = {
    float_right : "float_right"
}

export { _, DOM, CLASS_LIST };