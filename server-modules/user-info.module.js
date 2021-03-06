const mongoClient = require('mongodb').MongoClient,
      mongoUrl = 'mongodb://localhost:27017',
      objectId = require('mongodb').ObjectId,
      dbName = 'regexdb',
      querystring = require('querystring'),
			url = require('url'),
			log = require('./console-log.module');

module.exports = function(req, res) {
  const id = querystring.parse(url.parse(req.url).query)._id;
	mongoClient.connect(mongoUrl, (err, db) => {
		if (err) {
			res.end(JSON.stringify({ status: 'error', message: 'Error missing get user info' }));
			log.error('Error: connect to db');
			console.log(err);
			return;
		}
		db.db(dbName).collection('users').find({'_id': objectId(id) }).toArray((err, result) => {
			if (err || !result.length) {
				res.end(JSON.stringify({ status: 'error', message: 'Error missing get user info' }));
				db.close();
				log.error('Error: find user into db');
				return;
			}
			delete result[0]._id;
			delete result[0].password;
			res.end(JSON.stringify({ status: 'ok', data: result[0] }));
			log.succesful('Successful: get user info');
		});
	});
}
