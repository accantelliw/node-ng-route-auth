var common      = App.require('app/utils/common');
var data 		= App.require('app/models/data');
var resource    = "dataCtrl";

exports.list = function list(req, res) {

	data.selectAll(function(err, results) {
		if (err) {
			return res.status(500).json({success:false, data:err});
		}

		res.status( 200 );
		res.end( JSON.stringify(results), 
			'utf-8' );
	});

}

exports.getById = function getById(req, res) {

	var id   = req.params.id;

	data.selectById(id, function(err, results) {
		if (err) {
			return res.status(500).json({success:false, data:err});
		}

		res.status( 200 );
		res.end( JSON.stringify(results), 
			'utf-8' );
	});

}

exports.getStatistics = function getStatistics(req, res) {

	var id   = req.params.id;

	data.selectStatistics(function(err, results) {
		if (err) {
			return res.status(500).json({success:false, data:err});
		}

		res.status( 200 );
		res.end( JSON.stringify(results), 
			'utf-8' );
	});

}
