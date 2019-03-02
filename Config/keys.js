//When the API is deployed to a cloud service NODE_ENV gets set to production
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
  } else {
    module.exports = require('./keys_dev');
}

//When Jest is run the NODE_ENV gets set to test
if(process.env.NODE_ENV === 'test') {
  module.exports = require('./keys_test');
}