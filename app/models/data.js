var resource = "data";

var storage = [
	{ id: 0, author:"Albert Einstein", 	type:"funny", quote:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe." },
	{ id: 1, author:"Mae West", 		type:"life",  quote:"You only live once, but if you do it right, once is enough." },
	{ id: 2, author:"Steve Martin", 	type:"funny", quote:"A day without sunshine is like, you know, night." },
	{ id: 3, author:"Mark Twain", 		type:"funny", quote:"Never put off till tomorrow what may be done day after tomorrow just as well." },
	{ id: 4, author:"Woody Allen", 		type:"funny", quote:"I'm not afraid of death; I just don't want to be there when it happens." },
	{ id: 5, author:"Stephen Hawking",  type:"life",  quote:"However difficult life may seem, there is always something you can do and succeed at." },
	{ id: 6, author:"George Bernard Shaw", 	type:"life",  quote:"Life isn't about finding yourself. Life is about creating yourself." },
	{ id: 7, author:"Oscar Wilde", 		type:"self",  quote:"Be yourself; everyone else is already taken." },
	{ id: 8, author:"Confucius", 		type:"life",  quote:"Life is really simple, but we insist on making it complicated." },
	{ id: 9, author:"Dalai Lama", 		type:"self",  quote:"In order to carry a positive action we must develop here a positive vision." },
	{ id:10, author:"Monty Python", 	type:"life",  quote:"Always look on the bright side of life." }
];	

exports.selectAll = function selectAll(callback) {
	callback(null, storage);
}

exports.selectById = function selectById(id, callback) {

	var out = {};

	for (var i=0; i<storage.length; i++) {
		var x = storage[i];
		if (x.id == id) {
			out = x;
		}
	}

	callback(null, out);
}

exports.selectStatistics = function selectStatistics(callback) {

	var types = [];
	var count = [];

	for (var i=0; i<storage.length; i++) {
		var x = storage[i];
		var idx = types.indexOf(x.type);
		if (idx < 0) {
			types.push(x.type);
		}
		else {
			count[idx] = count[idx] + 1 || 1;
		}
	}

	var typeQuotes = [];
	for (var i=0; i<types.length; i++) {
		typeQuotes.push({
			type : types[i],
			count: count[i]
		});
	}

	var out = {
		numQuotes: storage.length,
		typeQuotes: typeQuotes
	};

	callback(null, out);
}

