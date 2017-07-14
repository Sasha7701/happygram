// module configurations  ###############################

const express = require('express');
const router = express.Router();

// database configurations  #############################

const User = require('../models/user');
const Files = require('../models/file');

// Photo model should have a method for requesting all comments and like
// so no need to import those models explicitly..
// const Comment = require('../models/comment');
// const Like = require('../models/like');

// middleware  #########################################

const userAuthMW = require('../middleware/userAuthMW');
// router.use(userAuthMW);

// routes  #############################################


router.get('/home', function(req, res) {
// add a logged in check to the user/home route to redirect to app/home or user page
	Files.findAll({ where: {
		userId: req.user.id,
	}})
	.then(function(data) {
		// console.log("******************   '/user/home'    ******************* data: ", data, " req.user: ", req.user);
		res.render("home", { user: req.user, data: data });
	})
});

router.get('/logout', function(req, res) {
	req.session.userid = null;
	res.redirect('../');
});

router.get('/:username', function(req, res) {
	User.findOne({ where: {
		username: req.params.username,
	}
	})
	.then(function(user) {
		if (user) {
			return user;	
		}
		else {
			res.render("home", { error: "No such user"});
		}
	})
	.then(function(user) {
		Files.findAll({ where: {
			userId: user.id,
		}})
		.then(function(data) {
			// console.log("******************   '/user/:userid'    ******************* data: ", data, " req.user: ", req.user);
			res.render("home", { thisUser: user, data: data, user: req.user });
		})
	})
	.catch(function(err) {
		console.error(err);
	})
});

module.exports = router;