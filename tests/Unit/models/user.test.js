const {User} = require('../../../Models/user');
const jwt = require('jsonwebtoken');
const config = require('../../../Config/keys');
const mongoose = require('mongoose');


describe('User model', () => {

    //Test 1 - Generate JWT token via function in User model
    it('JWT Generation', () => {   

        //payload: Inlcudes the data being used in the JWT: refer to the User model, and then look at generateAuthToken
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
        }

        // user: creates the user object
        const user = new User(payload);
        console.log(`User payload: ${payload}`);

        // token: generates the token using the method defiend in the user model
        const token = user.generateAuthToken();
        console.log(`Token generation: ${token}`)

        // decoded: verifies the JWT token and ensures the identifier was used
        const decoded = jwt.verify(token, config.secret);
        console.log(`Decoded JWT: ${decoded}`);

        // expects the decoded object to match the payload, it must be truthy to pass
        expect(decoded).toMatchObject(payload);
    });
});
