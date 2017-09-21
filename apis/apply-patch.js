/**
 * Apply the given json patch to the given json object and return the result.
 */

const jsonpatch = require('json-patch');

const errorlog = require('../logger').errorlog;
const successlog = require('../logger').successlog;


let apply = (body)=>{
    try {
        let newJson = jsonpatch.apply(body.json, body.patch);
        successlog.info(`Success: JSON patching successful. new json is ${newJson}`);
        return JSON.stringify({
            success: 'true',
            output: newJson
        });
    }
	catch(err) {
        errorlog.error(`Error <Method(patch:apply)>: ${err}`);
        return JSON.stringify({
            success: 'false',
            message: 'Failed to apply patch',
            error: err
        });
    } 
};


module.exports = {
    apply:apply
};