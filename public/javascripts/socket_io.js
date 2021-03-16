import { _, DOM, CLASS_LIST } from "./utill.js"
const socket = io();
const { name, message, chatLog } = DOM;
const { float_right } = CLASS_LIST;


DOM.chat.addEventListener('submit', function(e) { 
    socket.emit('send message', name.value, message.value, socket.id);
    message.value = '';
    console.log(socket.id)
    // message.focus();
    e.preventDefault();
});

socket.on('create name', function(name){ 
    DOM.name.value = name;
});

socket.on('receive message', function({ msg, socketId }) { 
    const speech_bubble = document.createElement('div');
    speech_bubble.classList.add('speech_bubble');
    const text = document.createElement('div');
    text.classList.add('bubble');
    text.innerHTML = msg;
    console.log(msg)
    speech_bubble.append(text);
    chatLog.append(speech_bubble);

    if(socket.id === socketId) {
        _.addClass(text, float_right);
    }
    // 새로운 채팅 추가시 자동으로 스크롤 다운. // scrollTop = 현재 스크롤값  scrollHeight = 변한 값
    chatLog.scrollTop = chatLog.scrollHeight;
});