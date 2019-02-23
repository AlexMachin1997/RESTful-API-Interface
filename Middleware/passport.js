//Requiring the dependencies
const {Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../Config/keys');
const {User} = require('../Models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

module.exports = function (passport) {
    passport.use(new Strategy(opts, async (jwt_payload, done) => {
        try {        
            const user = await User.findById(jwt_payload._id);
            
            if(user) {
                done(null, user);
                // console.log(jwt_payload);    
            } else {
                done(null, false);
            }
        } 
        catch(err) {
            console.error(`Passport middleware error:  ${err}`);
        }
    }));
};