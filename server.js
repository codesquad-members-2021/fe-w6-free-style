const express = require('express');
const server = express();
const http = require('http').Server(server); 
const io = require('socket.io')(http);    
const path = require('path');
const indexRouter = require('./routes/index');
const ejs = require('ejs');

const port = 8080;

server.set('views engine','ejs');
server.engine('html', ejs.renderFile);

server.use(express.static(path.join(__dirname, 'public')));

server.use('/',indexRouter);

let arr = [];

io.on('connection', async function(socket){ 
	let user = null;
	await socket.on('User name', function(name) {
		user = name;
		arr.push(name); // reload 고쳐야함. 아직 작동안함.
  		io.to(socket.id).emit('create name', name);  
		io.emit('connect message', name, socket.id);
		io.emit('real time user', name, arr, socket.id);
	});

	socket.on('real_time_list', function(user_list){
		arr = arr.filter((v,i) => v === user_list[i]);
	})

	socket.on('disconnect', function(){
	  	io.emit('disconnect message', user, socket.id);
	});

	socket.on('send message', function(name, text, socketId) {
		let msg = name + "<br>" + text;
		socket.name = name;
    	io.emit('receive message', msg, socketId);
	});
});

// app.use(function(req, res, next) {
// 	next(createError(404));
//   });
  
  // error handler
//   app.use(function(err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
//   });

http.listen(port, function(){ 
	console.log(`http://localhost:${port} server on..`);
});