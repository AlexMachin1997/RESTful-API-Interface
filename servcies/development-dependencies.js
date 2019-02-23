module.exports = function () {
    if(process.env.NODE_ENV === 'development') {
        const morgan = require('morgan')
        app.use(morgan('tiny'));
    }
}