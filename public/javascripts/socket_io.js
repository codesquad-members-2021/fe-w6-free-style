import { _, DOM, CLASS_LIST } from "./utill.js"
const socket = io();
const { name, message, chatLog, user_name } = DOM;
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
});

// name 채팅창에 적어주기
socket.on('create name', function(name){ 
    DOM.name.value = name;
});

socket.on('connect message', function(name, socketId, name_list) {
    // 본인 접속확인 및 다른유저에게 접속자 확인
    const connect_speech_bubble = _.$create('div');
    const text = _.$create('div');
    _.addClass(connect_speech_bubble, 'disconnect_speech_bubble');
    _.addClass(text, 'disconnect_speaker');
    socket.id !== socketId ? _.addHTML(text, `${name}님이 접속하였습니다.`) : _.addHTML(text, `${name}님은 채팅방에 접속하셨습니다.`);
    _.append(connect_speech_bubble, text);
    _.append(chatLog, connect_speech_bubble);

    //현재 접속자에 추가
    // if(socket.id !== socketId) {
    //     name_list.forEach((v,i) => {
    //         const connect_user = _.$create('div');
    //         _.addClass(connect_user,"user_name");
    //         _.addHTML(connect_user, v);
    //         _.nodeCount(user_name[0]) < 10 ? _.append(user_name[0], connect_user) : _.append(user_name[1], connect_user)
    //     })
    // } else if(socket.id === socketId) {
    //     const connect_user = _.$create('div');
    //     _.addClass(connect_user,"user_name");
    //     _.addHTML(connect_user, name);
    //     _.nodeCount(user_name[0]) < 10 ? _.append(user_name[0], connect_user) : _.append(user_name[1], connect_user)
    // }
    
})

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