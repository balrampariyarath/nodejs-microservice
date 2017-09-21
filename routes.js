const express = require('express');
const bodyParser = require('body-parser').json();

const auth  = require('./apis/auth');
const patch = require('./apis/apply-patch');
const thumbnail = require('./apis/generate-thumbnail');

const errorlog = require('./logger').errorlog;
const successlog = require('./logger').successlog;

const  app = express.Router();


/**
 * URL: http://localhost:3000/api/v1/login
 * Content-Type: JSON (application/json)
 * Params:
 *  username: string
 *  password: password
 */
app.post('/login',(req,res)=>{
    try {
        let result = auth.login(req.body);
        res.send(result);
    }
    catch(err) {
        errorlog.error(`Error <Method(login)>: ${err}`);
    }
});


/**
 * URL: http://localhost:3000/api/v1/validate
 * Content-Type: application/x-www-form-urlencoded
 * Params:
 *  token: token
 */
app.post('/validate',(req,res)=>{
    try {
	    let bool = auth.validate(req.body.token);
        res.send(bool);
    }
    catch(err) {
        errorlog.error(`Error <Method(validate)>: ${err}`);
    }
});


/**
 * URL: http://localhost:3000/api/v1/applyPatch
 * Content-Type: JSON (application/json)
 * Params:
 *  json: json object
 *  patch: json patch object
 *  token: token
 */
app.post('/applyPatch', bodyParser, (req,res)=>{
    if (auth.validate(req.body.token)) {
        jsondata = patch.apply(req.body);
		res.send(jsondata);
	}
	else {
        errorlog.error(`Error <Method(applyPatch)>: Invalid Token`);
		res.send(
            JSON.stringify({
                success: 'false',
                message: 'Invalid Token',
            })
        );
    }
});


/**
 * URL: http://localhost:3000/api/v1/getThumbnail
 * Content-Type: JSON (application/json)
 * Params:
 *  image: string (Image URL)
 *  token: token
 */
app.post('/getThumbnail',(req,res)=>{
	if (auth.validate(req.body.token)) {
		thumbnail.generate(req.body.image).then((thumbnail)=>{
			res.send(thumbnail);
		}).catch((err)=>{
            errorlog.error(`Error <Method(getThumbnail)>: ${err}`);
            res.send(
                JSON.stringify({
                    success: 'false',
                    message: 'Error',
                    error: err
                })
            );
		});
	}
	else {
        errorlog.error(`Error <Method(getThumbnail)>: Invalid Token`);
		res.send(
            JSON.stringify({
                success: 'false',
                message: 'Invalid Token',
            })
        );
	}
});

module.exports = app;