var common       = App.require('app/utils/common');
var users 	     = App.require('app/models/users');
var tokenHandler = App.require('app/helpers/tokenHandler');

var resource    = "authCtrl";

exports.login = function login(req, res) {

	var username = req.body.username;
	var password = req.body.password;

	if (!username || !password) {
		App.log("ERROR", resource, "Unauthorized "+JSON.stringify(req.body))
		return res.status(403).json(
			common.buildJsonAuthResponse("Unauthorized"));
	}

	users.selectUser(username, password, function(err, results) {
		
		if (err) {
			App.log("ERROR", resource, "Invalid Credentials for username:"+username)
			return res.status(403).json(
				common.buildJsonAuthResponse("Invalid Credentials"));
		}

		if (results && results.length > 0) {

			var userInfo = {
				id:   results[0].id,
				name: results[0].username,
				role: results[0].role
			}

			App.log("DEBUG", resource, "Payload:"+JSON.stringify(userInfo));
			var jwt = tokenHandler.issueToken(userInfo);
			App.log("DEBUG", resource, "Created JWT:"+JSON.stringify(jwt));

			if (!jwt) {
				App.log("ERROR", resource, "Error creating token")
				return res.status(403).json(
					common.buildJsonAuthResponse("Error creating token"));
			}

			res.status(200);
			res.set('x-access-token', jwt);
			res.json({
				success:true, 
				message:"Welcome, enjoy this application", 
				token:jwt
			});
		}
		else {
			App.log("ERROR", resource, "User not Found:"+username)
			return res.status(403).json(
				common.buildJsonAuthResponse("User not Found"));
		}
	});	

}

exports.authenticate = function authenticate(req, res, next) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		
		var decoded = tokenHandler.verifyToken(token);
		if (decoded == null) {

			App.log("ERROR", resource, "Invalid token")
			return res.status(403).json(
				common.buildJsonAuthResponse("Invalid token"));

		}
		else {
			req.userInfo = decoded;
			next();
		}
	}
	else {

		App.log("ERROR", resource, "No token provided")
		return res.status(403).json(
			common.buildJsonAuthResponse("No token provided"));

	}
}

exports.getUserProfile = function getUserProfile(req, res, next) {
	// This is the same of authenticate, 
	// but return decode token instead 
	// of forward to next route
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		
		var decoded = tokenHandler.verifyToken(token);
		if (decoded == null) {

			App.log("ERROR", resource, "Invalid token")
			return res.status(403).json(
				common.buildJsonAuthResponse("Invalid token"));

		}
		else {
			res.status( 200 );
			res.end( JSON.stringify(decoded), 
				'utf-8' );
		}
	}
	else {

		App.log("ERROR", resource, "No token provided")
		return res.status(403).json(
			common.buildJsonAuthResponse("No token provided"));

	}
}


