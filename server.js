const express = require('express');
const app = express();
const http = require('http').Server(app); 
const io = require('socket.io')(http);    
const path = require('path');
const indexRouter = require('./routes/index');
const ejs = require('ejs');

const port = 3000;

// app.set('views', './views');
// app.set('view engine', 'ejs');

app.set('views engine','ejs');
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);

io.on('connection', function(socket){ 
  	console.log('user connected: ', socket.id);  
  	var name = "익명";                 
	socket.name = name;
  	io.to(socket.id).emit('create name', name);   
	
	socket.on('disconnect', function(){ 
	  console.log('user disconnected: '+ socket.id + ' ' + socket.name);
	});

	socket.on('send message', function(name, text){ 
		var msg = name + ' : ' + text;
		socket.name = name;
    	console.log(msg);
    	io.emit('receive message', msg);
	});
});

app.use(function(req, res, next) {
	next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	// render the error page
	res.status(err.status || 500);
	res.render('error');
  });

http.listen(port, function(){ 
	console.log(`http://localhost:${port} server on..`);
});