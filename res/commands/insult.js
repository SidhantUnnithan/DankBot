// CORE MODULE IMPORTS
const request = require('request');


// LOCAL IMPORTS
const logger = require('../logger');
const INSULT_URL = require('../../config/urls').insultURL;

// LOCAL VARIABLES
let retPackage = {};


// Get an insult
var getInsult = callback => {
    
    // Making a request to Insult API
    request({
        uri: INSULT_URL,
        method: "GET",
        timeout: 5000,
        followRedirect: true,
        maxRedirects: 10 }, 
        
        (err, response, body) => {

            if(err){

                logger.log({
                    message : 'Error retrieving insults',
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
                retPackage.insult = apiResponse.insult;
                callback(retPackage);

            }
        }
    );
}

module.exports.getInsult = getInsult;
