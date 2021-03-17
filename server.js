const express = require('express');
const app = express();
const http = require('http').Server(app); 
const io = require('socket.io')(http);    
const path = require('path');
const indexRouter = require('./routes/index');
const ejs = require('ejs');

const port = 8080;

app.set('views engine','ejs');
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);

let arr = [];
io.on('connection', function(socket){ 
	let user = null;
	socket.on('User name', async function(name) {
		user = name;
		arr.push(name);
		console.log(arr);
  		io.to(socket.id).emit('create name', name);
		  
		await io.emit('connect message', user, socket.id, arr);
	})

	
	
	socket.on('disconnect', function(){ 
	  	io.emit('disconnect message', user);
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