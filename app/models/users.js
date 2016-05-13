var resource = "users";

var storage = [
	{ id: 0, username:'admin', password:'password', role:'admin' },
	{ id: 1, username:'test',  password:'test'    , role:'guest' },
	{ id: 2, username:'admin', password:'password', role:'admin' }
];

exports.selectAll = function selectAll(callback) {

	callback(null, storage);
}

exports.selectById = function selectById(id, callback) {

	var out = [];

	for (var i=0; i<storage.length; i++) {
		var x = storage[i];
		if (x.id == id) {
			out.push(x);
		}
	}

	callback(null, out);
}

exports.selectUser = function selectUser(username, password, callback) {

	var out = [];

	var found = false;
	for (var i=0; i<storage.length && !found; i++) {
		var x = storage[i];
		if (x.username == username && x.password == password) {
			out.push(x);
			found = true;
		}
	}

	if (!found) {
		callback('user not found', out);
	}
	else {
		callback(null, out);
	}
	
}

