// module configurations  ###############################

const express = require('express');
const router = express.Router();

// database configurations  #############################

const User = require('../models/user');
const File = require('../models/file');

// middleware  #########################################

// loggedOutMW will check if user.session and redirect to user/:userid
// else next();

// const sessionMW = require('../middleware/sessionMW');
// const loggedOutMW = require('../middleware/loggedOutMW');

// router.use(sessionMW);
// router.use(loggedOutMW);

// routes  #############################################

router.get('/', function(req, res) {
	File.findAll({ where: {
		userId: 3,
	}})
	.then(function(data) {
		res.render("landing", { data: data });
	})
});

router.get('/signup', function(req, res) {
		// req.session.destroy();
		res.render("signup");
});

router.post('/signup', function(req, res) {

	if (req.body.password && req.body.password === req.body.confirm) {
		User.signup(req)
		.then(function(user) {
			req.session.userid = user.dataValues.id;
			req.session.save(function(err) {
				console.log(err.original.detail, "*************** success case *********");
				res.redirect("/user/home");
			});
					
		})
		.catch(function(err) {
			console.error(err.original.detail, "********* catch case ************");
			res.render("signup", { error: err.original.detail })
		})
	} else {

	}
});

router.post('/signup/search', function(req, res) {
	User.search(req.body.username)
	.then(function(status) {
		res.json({ status: status });
	});
});

router.get('/login', function(req, res) {
	res.render("login");
});

router.post('/login', function(req, res) {
	User.findOne({ where: {
		username: req.body.username,
	}})
	.then(function(user) {
		if (user) {
			user.comparePassword(req.body.password)
			.then(function(valid) {
				if (valid) {
					req.session.userid = user.get("id");
					req.session.save(function(err) {
						res.redirect("/user/home");
					});
				}
				else {
					console.error("bad password");
				}
			})
			.catch(function(err) {
				console.error(err);
			})
		} else {
			console.error("User not found");
		}
	});
});


module.exports = router;