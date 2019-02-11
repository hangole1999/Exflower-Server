
module.exports = function (app) {

    var path = require('path');

	app.get('/', function (req, res, next) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'))
    });
    
};
