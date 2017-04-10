import deviceRequestHandler from '../api/deviceRequestHandler.js';


module.exports = function (app, passport) {


	//Get All Devices
	app.get('/devices', function (req, res) {
	  deviceRequestHandler.getAllDevices(req, res);
	});


	//Update Device Status. Allocation/Return
	app.put('/devices/update', isAuthenticated, function (req, res) {
	  deviceRequestHandler.updateDeviceStatus(req, res);
	});


	//Add New Device
	app.post('/device/add', isAuthenticated, function (req, res) {
		deviceRequestHandler.addNewDevice(req, res);
	});

	app.get('/user', function (req, res) {
		if (req.user) {
			res.json({user: req.user.local.email});
		}
		else {
			res.status(500).send({ "error": "Not Logged In" });
		}
		
		
	});

	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login.html?signup=true', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login.html', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/logout', function (req, res){
	  req.session.destroy(function (err) {
	    res.redirect('/login.html');
	  });
	});

    function isAuthenticated(req, res, next) {

	    // do any checks you want to in here

	    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
	    // you can do this however you want with whatever variables you set up
	    if (req.isAuthenticated())
	        return next();

	    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE

	     res.json({messages: "Not Logged In"});
	}

}