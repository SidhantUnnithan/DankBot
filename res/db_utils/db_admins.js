// LOCAL IMPORTS
const adminModel = require('../../models/admins');
const logger = require('../logger');

// Returns the list of admins in a callback function.
var getAdmins = callback => {

    logger.info('Called getAdmins Function');

    // Return all the admins
    adminModel.find({}, (err, result) => {

        // If error, log it and return empty array
        if(err){

            logger.error({
                message : 'Error while fetching admin list',
                file : 'db_functions.js',
                error : err
            })

            callback([]);
        }
        else{

            logger.info({
                message : 'Received Package from MongoDB Atlas',
                package : result
            })

            callback(result);
        }
    })
}

// Inserts the given admin to the database
var insertAdmins = (userid, username, callback) => {

    logger.info('Called insertAdmins Function');

    let temp = new adminModel({
        userid : userid,
        username : username
    });

    // Send the array
    temp.save().then(item => {
        logger.info({
        message : 'Send package to Database',
        package : item
        })
    })
    .catch(err => {
        logger.error({
            message : 'Error Sending Package to Database',
            file : 'db_admins.js',
            error : err
        })
    });

}


// EXPORTS
module.exports.getAdmins = getAdmins;
module.exports.insertAdmins = insertAdmins;