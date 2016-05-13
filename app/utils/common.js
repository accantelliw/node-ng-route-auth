exports.buildJsonAuthResponse = function buildJsonAuthResponse(message) {
	
	var rObj = {
		success: false,
		message: message || ''
	}

	return rObj;
}

exports.buildJsonInfoResponse = function buildJsonResponse(success, msg, rowCount, newId) {
	
	var rObj = {}

	if (success) {
		rObj.success = success;
	}
	
	if (msg) { 
		rObj.msg = msg;
	}
	
	if (rowCount) {
		rObj.rowCount = rowCount;
	}
	
	if (newId) {
		rObj.newId = newId;
	}
	
	return rObj;
}

exports.buildJsonDataResponse = function buildJsonDataResponse(data) {
	
	var rObj = {}

	if (data) {
		rObj = data;
	}

	return rObj;
}

