import { _, DOM, CLASS_LIST } from "./utill.js"
const socket = io();
const { name, message, chatLog } = DOM;
const { float_right } = CLASS_LIST;


DOM.chat.addEventListener('submit', function(e) { 
    socket.emit('send message', name.value, message.value, socket.id);
    message.value = '';
    e.preventDefault();
});

// User name 설정하기
window.addEventListener('DOMContentLoaded', () => {
    let user = prompt("사용하실 이름을 입력하세요.");
    socket.emit('User name', user);
    const connect_speech_bubble = _.$create('div');
    const text = _.$create('div');
    _.addClass(connect_speech_bubble, 'disconnect_speech_bubble');
    _.addClass(text, 'disconnect_speaker');
    _.addHTML(text, `${user}님이 채팅방에 들어오셨습니다.`);
    _.append(connect_speech_bubble, text);
    _.append(chatLog, connect_speech_bubble);
});

socket.on('create name', function(name){ 
    DOM.name.value = name;
});

// 상대방 연결이 종료되었을때 상대방 이름과함께 종료되었다고 띄우기
socket.on('disconnect message', function(name) {
    const disconnect_speech_bubble = _.$create('div');
    const text = _.$create('div');
    _.addClass(disconnect_speech_bubble, 'disconnect_speech_bubble');
    _.addClass(text, 'disconnect_speaker');
    _.addHTML(text, `${name}님이 채팅방을 나가셨습니다.`);
    _.append(disconnect_speech_bubble, text);
    _.append(chatLog, disconnect_speech_bubble);
})

socket.on('receive message', function(msg, socketId) { 
    const speech_bubble = _.$create('div');
    _.addClass(speech_bubble, 'speech_bubble');
    const text = _.$create('div');
    _.addClass(text, 'bubble');
    _.addHTML(text,msg);
    _.append(speech_bubble, text);
    _.append(chatLog, speech_bubble);

    if(socket.id === socketId) {
        _.addClass(text, float_right);
    }
    // 새로운 채팅 추가시 자동으로 스크롤 다운. // scrollTop = 현재 스크롤값  scrollHeight = 변한 값
    chatLog.scrollTop = chatLog.scrollHeight;
});