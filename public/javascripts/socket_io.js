import { _, DOM, CLASS_LIST } from "./utill.js"
const socket = io();
const { name, message, chatLog, user_name } = DOM;
const { float_right } = CLASS_LIST;
let user_count = [];


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

socket.on('connect message', function(name, socketId) {
    // 본인 접속확인 및 다른유저에게 접속자 확인
    const connect_speech_bubble = _.$create('div');
    const text = _.$create('div');
    _.addClass(connect_speech_bubble, 'disconnect_speech_bubble');
    _.addClass(text, 'disconnect_speaker');
    socket.id !== socketId ? _.addHTML(text, `${name}님이 접속하였습니다.`) : _.addHTML(text, `${name}님은 채팅방에 접속하셨습니다.`);
    _.append(connect_speech_bubble, text);
    _.append(chatLog, connect_speech_bubble);
});

// 접속 현황판
socket.on('real time user', function(name ,name_list, socketId) {
    // name_list = name_list.map(v => )
    if(socket.id !== socketId) {
        user_count = name_list;
        const user = _.$create('div');
        user.id = `user_${socketId}`
        _.addHTML(user, `<div id="${socketId}" class="user_name">${name}</div>`);
        _.nodeCount(user_name[0]) < 10 ? _.append(user_name[0],user) : _.addHTML(user_name[1], user);
    } else {
        // user_count = name_list;
        name_list.forEach(v => {
            const user = _.$create('div');
            _.addHTML(user, `<div class="user_name">${v}</div>`);
            _.nodeCount(user_name[0]) < 10 ? _.append(user_name[0],user) : _.addHTML(user_name[1], user);
        })
    }
})

// 상대방 연결이 종료되었을때 상대방 이름과함께 종료되었다고 띄우기
socket.on('disconnect message', function(name, socketId) {
    const disconnect_speech_bubble = _.$create('div');
    const text = _.$create('div');
    _.addClass(disconnect_speech_bubble, 'disconnect_speech_bubble');
    _.addClass(text, 'disconnect_speaker');
    _.addHTML(text, `${name}님이 채팅방을 나가셨습니다.`);
    _.append(disconnect_speech_bubble, text);
    _.append(chatLog, disconnect_speech_bubble);

    // 나갈 시 접속현황판에서 삭제
    if(socket.id !== socketId) {
        const node = _.$("#"+socketId);
        _.$("#"+"user_"+socketId).removeChild(node);
        
        // 나간사람 이름 빼는 부분
        user_count = user_count.filter(v => v !== name).map(v => v);
        // 이곳을 통해 최신 현재 접속자 리스트를 array로 서버로 보내 서버의 배열을 갱신한다.
        socket.emit("real_time_list", user_count);
    } 
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