const express = require('express');
const bodyParser = require('body-parser');
const errorlog = require('./logger').errorlog;
const successlog = require('./logger').successlog;

const routes = require('./routes.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/', routes);

app.listen(3000,()=>{
	successlog.info('Server listening at port 3000');
});

// For Testing
module.exports = app;