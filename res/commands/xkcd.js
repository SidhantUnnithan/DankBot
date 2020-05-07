// CORE MODULE IMPORTS
const request = require('request');


// LOCAL IMPORTS
const logger = require('../logger');
const XKCD_URL = require('../../config/urls').xkcdBaseURL;
const XKCD_URL_SUFFIX = require('../../config/urls').xkcdURLSuffix;

// LOCAL VARIABLES
let retPackage = {};


// Get a xkcd
var getXKCD = callback => {
    
    // Get max_num of comics available
    getMaxNum(max_num => {

        // Generate a random number between 1 and max_num

        let random_number = Math.floor(
            Math.random() * max_num + 1   
        );

        xkcdFinalUrl = XKCD_URL + '/' + random_number + '/' + XKCD_URL_SUFFIX;
        
        request({
            uri: xkcdFinalUrl,
            method: "GET",
            timeout: 5000,
            followRedirect: true,
            maxRedirects: 10 }, 
            
            (err, response, body) => {

                if(err){

                    logger.log({
                        message : 'Error retrieving xkcd',
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
                    retPackage.url = apiResponse.img;
                    callback(retPackage);
            

                }

            });

    });

}

// Get maxmimum number of XKCD comics
// This will be used to generate a random number between 1 and max_number
//  This random number will be used to GET a random xkcd

function getMaxNum(callback){

    let xkcdMaxUrl = XKCD_URL + '/' + XKCD_URL_SUFFIX;

    request({
        uri: xkcdMaxUrl,
        method: "GET",
        timeout: 5000,
        followRedirect: true,
        maxRedirects: 10 }, 
        
        (err, response, body) => {

            // If error, returns max_num as 2000 (Safe number)
            if(err){

                callback(2000);

            }

            else{
                
                // All OK Code
                retPackage.code = 200;
                apiResponse = JSON.parse(body);
                callback(apiResponse.num);

            }
        }
    );
}

module.exports.getXKCD = getXKCD;
