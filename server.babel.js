import express from 'express';
import mongoose from 'mongoose';
import deviceRequestHandler from './api/deviceRequestHandler.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import flash from 'connect-flash';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import localPassport from './config/passport.js';
import routes from './routes/route.js';

mongoose.connect('mongodb://localhost/db1');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB....");

});



const app = express();

app.use('/', express.static('public'));
app.use('/login.html', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(clientErrorHandler);
app.use(errorHandler);

localPassport(passport);

// required for passport
app.use(session({ secret: 'pankajKey' })); // session secret
app.use(cookieParser()); // Express cookie session middleware 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



app.use(function (err, req, res, next) {
  console.error(err.stack);
  console.log("First");
  res.status(500).send('Something broke!')
})

function errorHandler (err, req, res, next) {
	console.log("Second");
  res.status(500)
  res.render('error', { error: err })
}

function clientErrorHandler (err, req, res, next) {
	console.log("Third");
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}


routes(app, passport);

app.listen(process.env.PORT || 3000);

console.log("Server Started ....")
