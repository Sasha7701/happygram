const sql = require('../util/sql');
const Sequelize = require('sequelize');
// import the comments and the likes models here
const Users = require('./user');
const Likes = require('./like');
const Comments = require('./comment');
const fs = require("fs-extra");
const path = require("path");


const Files = sql.define("file", {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	description: {
		type: Sequelize.TEXT,
		notNull: true,
	},
	size: {
		type: Sequelize.INTEGER,
		notNull: true,
	},
	originalName: {
		type: Sequelize.STRING,
		notNull: true,
	},
	mimeType: {
		type: Sequelize.STRING,
		notNull: true,
	},
});

Files.prototype.like = function(userid) {
	return Likes.upsert({
		userid: userid,
		fileid: this.id,
		liked: true,  	// will need to eventually change this to a value from the page in order to toggle liked / unliked
	})
	.then(function(test) {
		if (test) {
			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ User.like $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:: updated ", test);
		}
		else {
			console.error("::::::::::::::::::::::::::::::::::::::::::::::::::::  User.like ::::::::::::::::::::::::::::: created");
		}
	})
};


Files.hasMany(Comments);
Files.hasMany(Likes);

// create the relations between comments and likes here

module.exports = Files;