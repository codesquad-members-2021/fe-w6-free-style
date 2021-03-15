const socket = io();

$('#left-chat').on('submit', function(e) { 
    socket.emit('send message', $('#name').val(), $('#message').val());
    $('#message').val('');
    $('#message').focus();
    e.preventDefault();
});

socket.on('create name', function(name){ 
    $('#name').val(name);
});

socket.on('receive message', function(msg){ 
    $('.chatLog').append(msg+'\n');

    // 새로운 채팅 추가시 자동으로 스크롤 다운.
    $('.chatLog').scrollTop($('.chatLog')[0].scrollHeight);
});

$('#right-chat').on('submit', function(e) { 
    socket.emit('send message2', $('#name2').val(), $('#message2').val());
    $('#message2').val('');
    $('#message2').focus();
    e.preventDefault();
});

socket.on('create name2', function(name){ 
    $('#name2').val(name);
});

socket.on('receive message2', function(msg){ 
    $('.chatLog').append(msg+'\n');

    // 새로운 채팅 추가시 자동으로 스크롤 다운.
    $('.chatLog').scrollTop($('.chatLog')[0].scrollHeight);
});





