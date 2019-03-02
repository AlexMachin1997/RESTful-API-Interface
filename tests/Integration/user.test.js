const request = require('supertest');
const {User} = require('../../Models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let server;
let token;

// User model wrapper
describe('/api/user', () => {

    beforeEach(() => {
         // Import the index file to start the server
        server = require('../../index');
        
        // Initalize body data
        name = "",
        email = "",
        password = "",
        phone = "",
        allergies = [] 
    });

    afterEach(async() => {
        await server.close(); // Close the server connection
    });

    describe('/api/users endpoint',() => {

        // Register route tests
        describe('POST /register endpoint', () => {
            const exec = async () => {
                return await request(server)
                    .post('/api/users/register')
                    .send({
                        name,
                        email,
                        password,
                        phone,
                        allergies
                    });
            };
                
            describe('Name validation', () => {
                it('Should return 400 if the users name is missing', async() => {
                    name = ''
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('Should return 400 if the users name is a number', async() => {
                    name = 3343434343
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });
    
            describe('Email validation', () => {
                it('Should return 400 if the users email is invalid', async() => {
                    email = 'alexmachin1997gmail.com'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('Should return 400 if the users email is invalid', async() => {
                    email = '23333'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('Should return 400 if the users email is just numbers', async() => {
                    email = 3343434343
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });
    
            describe('Password validation', () => {           
                it('Should return 400 if the users password is less than 5 characters', async() => {
                    password = 'Goodb'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });  
    
                it('Should return 400 if the users phone is the password is missing', async() => {
                    password = ''
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
                
                it('Should return 400 if the users phone is the password is a number', async() => {
                    password = 32323232
                    const response = await exec();
                    expect(response.status).toBe(400);
                });  
            });
    
            describe('Phone validation', () => {
                it('Should return 400 if the users phone is a string of characters', async() => {
                    phone = 'fdfdsfsf'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });
    
            describe('Allergies validation', () => {
                it('Should return 400 if the users allergies is not an array', async() => {
                    allergies = 'sad'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('Should return 400 if the users allergies is an array but does not contain strings', async() => {
                    allergies = [{},{},{}]
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });
    
            describe('Valid register request', () => {
                
                afterEach(async() => {
                    // https://mongoosejs.com/docs/models.html#deleting
                    await User.deleteOne({email: 'JoanneMachin@gmail.com'}); 
                });
            
                 it('Should return 200 when a valid body is submitted', async () => {
                    
                     // _ID is not required, it is generated on MongoDB
                     const user = {
                         name : 'Joanne Marie Machin',
                         email : "JoanneMachin@gmail.com",
                         password : "goodboy1997",
                         phone : '07713758383',
                         allergies : ['Wheat', 'Peanut', 'Onions']   
                     };

                    // Salt the password, it is required 
                     const salt = await bcrypt.genSalt(10);
                     user.password = await bcrypt.hash(user.password, salt)
                     console.log(user);

                     const response = await request(server)
                         .post('/api/users/register')
                         .send(user)
                         expect(response.status).toBe(200)
                });    
             });
        });        

        // Login route tests
        describe('POST /login endpoint', () => {

            const exec = async () => {
                return await request(server).post('/api/users/login')
            };

            describe('Email validation', () => {
                it('It should return 400 if the email is missing', async() => {
                    email ='' // Missing email
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('It should return 400 if the email is incorrect', async() => {
                    email ='alexmachin1998@gmail.com' //Incorrect email
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });

            describe('Password validation', () => {
                it('It should return 400 if the password is missing', async() => {
                    password =''
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('It should return 400 if the password doenst match the hash on the database', async() => {
                    password ='goodboy1996' // Incorrect password
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });

            describe('Username and password do not match', () => {
                it('It should return a 200 and log the user in', async() => {
                    const res = await request(server)
                        .post('/api/users/login')
                        .send({
                            email: 'alexmachin1997@gmail.com',
                            password: 'goodboy1996'
                        })
                    expect(res.status).toBe(400)
                    expect((res) => {
                        expect(res.headers['Authorization']).toBeNull();
                    })
                });
            });
            
            describe('Username and password match', () => {
                it('It should return a 200 and log the user in', async() => {
                    const res = await request(server)
                        .post('/api/users/login')
                        .send({
                            email: 'alexmachin1997@gmail.com',
                            password: 'goodboy1997'
                        })
                    expect(res.status).toBe(200)
                    expect((res) => {
                        expect(res.headers['Authorization']).not.toBeNull();
                    })
                });
            });
        });

        // Me route tests
        describe('GET /me endpoint', () => {
            
            const exec = async () => {
                return await request(server)
                .get('/api/users/me')
                .set("Authorization",token)
            };
                            
            describe('Invalid token', () => {
                it('Should return 401 if no token is provided', async() => {
                    token = '';
                    const response = await exec();
                    expect(response.status).toBe(401);
                });
    
                it('Should return 401 if an invalid token is provided', async() => {
                    token = '121DSDS';
                    const response = await exec();
                    expect(response.status).toBe(401);
                });
            })

            describe('Valid token', () => {
                
                beforeEach(async(done) => {
                    request(server)
                        .post('/api/users/login')
                        .send({
                            email: 'alexmachin1997@gmail.com',
                            password: 'goodboy1997'
                        })
                        .end((err,response)=> {
                            token = response.body.token; //Saving the token from the body and setting it equal to the token declaration
                            done();
                        });
                });

                const exec = async () => {
                    return await request(server)
                    .get('/api/users/me')
                    .set('Authorization', `${token}`)
                };

                it('Should return 200 if a valid token is provided', async() => {
                    const response = await exec();
                    expect(response.status).toBe(200);
                });
            });
        });

        // Update route tests
        describe('PUT / endpoint', () => {
            
            beforeEach(async(done) => {
                request(server)
                    .post('/api/users/login')
                    .send({
                        email: 'alexmachin1997@gmail.com',
                        password: 'goodboy1997'
                    })
                    .end((err,response)=> {
                        token = response.body.token; //Saving the token from the body and setting it equal to the token declaration
                        done();
                    });
            });
    
            const exec = async () => {
                return await request(server)
                .put('/api/users')
                .set('Authorization', `${token}`)
                .send({
                    name,
                    email,
                    phone,
                    allergies,
                })
            };

            describe('PassportJS middleware', () => {
                it('Should return 401 if no token is provided', async() => {
                    token = '';
                    const response = await exec();
                    expect(response.status).toBe(401);
                });

                it('Should return 401 if an invalid token is provided', async() => {
                    token = '1232321';
                    const response = await exec();
                    expect(response.status).toBe(401);
                });
            })
        
            describe('Name validation', () => {
                it('Should return 400 if the users name is missing', async() => {
                    name = ''
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('Should return 400 if the users name is a number', async() => {
                    name = 3343434343
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });

            describe('Email validation', () => {
                it('Should return 400 if the users email is invalid', async() => {
                    email = 'alexmachin1997gmail.com'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('Should return 400 if the users email is invalid', async() => {
                    email = '23333'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('Should return 400 if the users email is just numbers', async() => {
                    email = 3343434343
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });

            describe('Phone validation', () => {
                it('Should return 400 if the users phone is a string of characters', async() => {
                    phone = 'fdfdsfsf'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });
    
            describe('Allergies validation', () => {
                it('Should return 400 if the users allergies is not an array', async() => {
                    allergies = 'sad'
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
    
                it('Should return 400 if the users allergies is an array but does not contain strings', async() => {
                    allergies = [{},{},{}]
                    const response = await exec();
                    expect(response.status).toBe(400);
                });
            });

            describe('Valid edit request', () => {
                it('It should return a 200', async() => {
                    name = "Alex James Machin",
                    email = "alexmachin1997@gmail.com",
                    phone = 7713758383,
                    allergies = ["Wheat"]
                    const response = await exec();
                    expect(response.status).toBe(200);
                });
            });    
        });

        // Delete route tests
        describe('DELETE /delete endpoint', () => {
            
            beforeEach(async(done) => {
                request(server)
                    .post('/api/users/login')
                    .send({
                        email: 'alexmachin1997@gmail.com',
                        password: 'goodboy1997'
                    })
                    .end((err,response)=> {
                        token = response.body.token; //Saving the token from the body and setting it equal to the token declaration
                        done();
                    });
            });

            const exec = async () => {
                return await request(server)
                .delete('/api/users')
                .set('Authorization', `${token}`)
            };
                        
            describe('PassportJS middleware', () => {
                it('Should return 401 if no token is provided', async() => {
                    token = '';
                    const response = await exec();
                    expect(response.status).toBe(401)
                });
    
                it('Should return 401 if an invalid token is provided', async() => {
                    token = '233223';
                    const response = await exec();
                    expect(response.status).toBe(401)
                });
           });

            describe('Valid request', () => {
                
                afterEach(async() => {
                     // _ID is not required, it is generated on MongoDB
                     const user = {
                        name : 'Alex James Machin',
                        email : "alexmachin1997@gmail.com",
                        password : "goodboy1997",
                        phone : '7713758383',
                        allergies : []   
                    };
    
                   // Salt the password, it is required 
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt)

                    await User.collection.insertOne(user);
                });
               
               
                it('Should return 200 if a valid token is provided', async() => {
                    const response = await exec();
                    expect(response.status).toBe(200)
                });
           })
        });
    });
})