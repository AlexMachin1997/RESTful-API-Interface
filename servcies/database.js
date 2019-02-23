const mongoose = require('mongoose');
// Enviroment variables initalization:
const config = require('../Config/keys');

module.exports = function () {
    if(!config) {
        console.error('Fatal error, the enviroment variables are incorrect');
        process.exit(1);
        throw new Error('Fatal error, the enviroment variables are incorrect')
    }   
    
    mongoose.set('useCreateIndex', true);
    
    mongoose.connect(`${config.mongoURL}`, {useNewUrlParser: true})
        //After connecting show the message
        .then(() => {
            console.log('You are connected MongoDB...')
        })

        //Any errors the catch promise will be use
        .catch(() => {
            console.log('Could not connect to MongoDB...')
        })   
}