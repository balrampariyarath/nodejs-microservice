/**
 * Perform generation and validation of JWT token for a valid user.
 * As per the test statement it accepts any username/password pair.
 */

const jwt = require('jsonwebtoken');

const errorlog = require('../logger').errorlog;
const successlog = require('../logger').successlog;


let login = (body)=>{
    try{
        let token = jwt.sign({ username: body.username, password: body.password }, 'secret-key');
        successlog.info(`Success: Token Created. Token is ${token}`);
        return JSON.stringify({ 
            success: 'true',
            token: token
        });
    }
    catch(err) {
        errorlog.error(`Error <Method(auth:login)>: ${err}`);
        return JSON.stringify({
            success: 'false',
            message: 'Failed to generate the token',
            error: err
        });
    }
};

let validate = (token)=>{
	try {
        let decoded = jwt.verify(token, 'secret-key');
        successlog.info(`Success: Token Decoded. Decoded data is ${decoded}`);
		return true;
	}
	catch(err) {
        errorlog.error(`Error <Method(auth:validate)>: ${err}`);
		return false;
	}
};


module.exports = {
    login:login, 
    validate:validate
};