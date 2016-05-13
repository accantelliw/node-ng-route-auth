var jwt = require('jsonwebtoken');

var resource = "tokenHandler";

exports.issueToken = function(payload) {
	var token = null;
	try {
		token = jwt.sign(payload, App.jwtSecretKey);
		App.log("DEBUG", resource, JSON.stringify(token));
	} catch (e) {
		App.log("ERROR", resource, "Error creating token with payload:"+payload);
	}
	return token;
}

exports.verifyToken = function(token) {
	
	try {
		return jwt.verify(token, App.jwtSecretKey);
	} catch (e) {
		App.log("ERROR", resource, "Invalid token");
		return null;
	}

}