const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
	MongoClient.connect(
		'mongodb+srv://watto:DJC@TJf55YnRXSy@node-prac-urvyj.gcp.mongodb.net/shop?retryWrites=true&w=majority'
	)
		.then(client => {
			_db = client.db();
			console.log('Connected');
			callback();
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

const getDb = () => {
	if (_db) return _db;
	else throw 'No Databases Found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
