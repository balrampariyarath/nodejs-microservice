/**
 * Download and store the image, genarate a 50x50 thumbnail of it and return the thumbnail URL.
 */

const gm = require('gm').subClass({imageMagick:true});
const imagedownloader = require('image-downloader');

const errorlog = require('../logger').errorlog;
const successlog = require('../logger').successlog;

let generate = (img)=>{
    const options = {
        url:img,
        dest:'./assets/thumbnails'
    };
    return new Promise((resolve,reject)=> {
        imagedownloader.image(options).then(({filename, image}) => {
            successlog.info(`Success: Upload Complete. Location: ${filename}`);
            gm(filename).resize(50,50,'!').write(filename,(err)=>{
				resolve(filename);
            });
        }).catch((err) => {
            errorlog.error(`Error <Method(getThumbnail:generate)>: ${err}`);
            reject("error");
        });
    }).then((filename)=>{
        successlog.info(`Success: Thumbnail Created. New filename is ${filename}`);
        return JSON.stringify({
            success: 'true',
            filename: filename
        });
    }).catch((err)=>{
        errorlog.error(`Error <Method(getThumbnail:generate)>: ${err}`);
        return JSON.stringify({
            success: 'false',
            message: 'Failed to create thumbnail',
            error: err
        });
    })
};
    

module.exports = {
    generate:generate
};