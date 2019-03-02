module.exports = function (app) {
    if(process.env.NODE_ENV === 'development') {
        const morgan = require('morgan')
        app.use(morgan('tiny'));
    }
}