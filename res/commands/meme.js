// CORE MODULE IMPORTS
const request = require('request');


// LOCAL IMPORTS
const logger = require('../logger');
const MEME_URL = require('../../config/urls').memeURL;

// LOCAL VARIABLES
let retPackage = {};


// Get a Meme
var getMeme = callback => {
    
    // Making a request to Meme API
    request({
        uri: MEME_URL,
        method: "GET",
        timeout: 5000,
        followRedirect: true,
        maxRedirects: 10 }, 
        
        (err, response, body) => {

            if(err){

                logger.log({
                    message : 'Error retrieving memes',
                    error : err
                });
                
                // Returning error code
                retPackage.code = 400;
                callback(retPackage);

            }

            else{
                
                // All OK Code
                retPackage.code = 200;
                let apiResponse = JSON.parse(body);
                retPackage.url = apiResponse.url;
                callback(retPackage);

            }
        }
    );
}

module.exports.getMeme = getMeme;
