const mongoose = require('mongoose');
const config = require('../Config/keys');

module.exports = function () {

    //If !config is false (empty) then exit and show error message
    if(!config) {
        console.error('Fatal error, the enviroment variables are incorrect');
        process.exit(1);
    }   
    
    // collection.ensureIndex is deprecated. useCreateIndex is set to true to remove the warning
    mongoose.set('useCreateIndex', true);

    // mongoose.connect returns a promise
    mongoose.connect(`${config.mongoURL}`, {useNewUrlParser: true})

        .then(() => {
            if(process.env.NODE_ENV === 'test') {
                // Nothing needed during testing.
            } else {
                // When not in production log the connection message
                console.log(`You are connected`);
            }
        })

    //Any errors the catch promise will be use
    .catch(() => {
        console.log('Could not connect to MongoDB...')
    })   
}