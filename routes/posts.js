const exp = require("express");
const renderTemplate = require("../util/renderTemplate");
const router = exp.Router();
const multer = require("multer");
const uploader = multer({
	dest: "uploads/"
});

const fs = require('fs');

app.post("/posts", uploader.single("image"), function(req, res) {
	console.log(req.body.title, req.body.comment, req.file)
	fs.renameSync(req.file.path, req.file.destination + req.file.filename)
	Blog.add(req.body.title, req.body.comment, req.file.filename)
	.then(function(title, comment, image) {
		// fs.readdir("./assets/images", function(err, images) {
	res.redirect("/destinations");
   })	
	.catch(function(err) {
		res.status(403);
 	    res.render("/");
  	})
});

 module.exports = router;