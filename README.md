
# NodeJS REST API Client &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AlexMachin1997/RESTful-API-Interface/blob/master/README.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

The repository consists of a Node.JS RESTful application programming interface(API) which will perform CRUD operations for a food allergy mobile application which will be produced using [React-Native](https://facebook.github.io/react-native/) app. 

As part of the README file it will describe and explain the following sections:
* Purpose 
* Core features
* Technologies used
* Getting started
* Testing
* Endpoints
* Deployment notes
* Reporting issues
* Feature requests
* Project information

## Purpose
The API will play a vital role when integrated with a client-side mobile application such as the allergy application which will be produced. It will allow users to register and login to the application, though for this to happen a centralised database will be required. However, the database won't be much use if the mobile application can't communicate with the client app; this is where the API will play its role, it will allow HTTP requests to be made.

## Core features
As of the current version of the API, it is currently capable of performing the following tasks:
* Authenticating existing users and generating a JWT token for session persistence and authorization
* Authorising users to access specific endpoints through a JWT token
* Registering new users
* Querying for the currently logged in users data
* Updating user information
* Deleting users who no longer want an account

## Technologies used:
* [NodeJS](https://nodejs.org/en/) - Allows JavaScript to be executed on the server-side of an application, one language to rule them all.
* [NPM](https://www.npmjs.com/)  - NodeJS package manager, dependencies can be downloaded from the popular registry
* [MongoDB](https://www.mongodb.com/) - The database which is being used
* [Mongoose](https://mongoosejs.com/) - Used to connect and perform queries to MongoDB
* [Mlab](https://mlab.com/) - The cloud solution for MongoDB
* [JSON Web Token (JWT)](https://jwt.io/) - Generates a secure authentication and authorization token.
* [Joi](https://github.com/hapijs/joi) - Used to validate objects
* [lodash](https://lodash.com/) - Small JavaScript utility library
* [PassportJS](http://www.passportjs.org/) - Handles the JWT header extraction for authorization
* [Cors](https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b) - Required for the API to deliver resources from a separate domain
* [Morgan](https://www.npmjs.com/package/morgan) - logs requests to the development server, won't be available in production
* [Helmet](https://www.npmjs.com/package/helmet) - Secures expresses HTTP headers, prevents clickjacking and  small XSS protections
* [Jest](https://jestjs.io/) - A testing framework for JavaScript, it performs unit and integration testing
* [Supertest](https://www.npmjs.com/package/supertest) - HTTP server for testing, used to test API calls, won't be available in production

## Getting started 
* Clone the project to your development environment by using ` git clone https://github.com/AlexMachin1997/RESTful-API-Interface.git`

* Install all dependencies for the application by issuing this command `npm install`; this will fetch all of the dependencies **(Excludes nodemon and Jest as they are development dependencies)**

* Create a [mlab account](https://mlab.com/signup/) and perform the following **(If I have given you the enviroment variables for an existing database skip this part)**:
    * Create a database
    * Create a user for the database on mlab
    * NOTE: **Remember the username and password for later, they are required for the enviroment variables**

* Install and configure an API development area like [Postman](https://www.getpostman.com/):
    * When the server is active you can use the express routes to perform CRUD operations.
    * When sending new or updating an object, you will need to submit a payload of data, to see the 
    * **NOTE**: Set the text to JSON for syntax highlighting

* Development enviroment variables setup:
    * Create keys_dev.js within the keys directory
    * After creating the file files add the following code sample: `` module.exports = {mongoURL: '',secret: ''} ``
    * variable setup:
        * mongoURL is the string from Mlab (Including the username and password)
        * secret is be the JWT identifier you want; usually, it is the projectname_JWTKey
            
* Server installation:
    * Dependency installation:
        * `npm i nodemon`, this will download a simply utility libarary to handle changes while the server is running
    * Initializing the development enviroment
        * Issue `npm start` to fire up the express server, the express server and mongo dtabase wil both be avaliable

 * Issues during setup: 
    * If there are issues repeat the setup, but if it still won't work post a question [here](https://github.com/AlexMachin1997/RESTful-API-Interface/issues)

## Unit and integration testing setup
* Dependency installations:
    * `npm install jest --dev`, this will install the Jest testing framework
    * `npm install supertest --dev`, this allows API calls to be made when testing with Jest

* Testing enviroment variables setup:
    * Create keys_test.js within the keys directory
    * After creating the file files add the following code sample: `` module.exports = {mongoURL: '',secret: ''} ``
    * variable setup:
        * mongoURL is the string from Mlab (Including the username and password)
        * secret is be the JWT identifier you want; usually, it is the projectname_JWTKey

* All done:
    * The testing framework is all set up now, presuming the test keys and dependencies were previously set up.
    * If there are issues repeat the setup, but if it still won't work post a question [here](https://github.com/AlexMachin1997/RESTful-API-Interface/issues)

* Performing test
    * `npm test`, runs all the files specified with [filename].test.js 
    * Upon performing the tests, you will receive an output like the example below (Not all tests can fit in the example screenshot)
    ![Jest test example output](https://lh3.googleusercontent.com/3h2sGR7-0h1BeIL0I8tFoYtdVlc6FP4yt8oAQwKs4hOOiD62KlAIeMyJv-vZlm2c6o8u23McLcT98omfMF8p9CAmnXOU5vqhq_tRb5alfqCAPZ3TkjMgc9IsyoBNYyUdPKGoe3B81Xy5GyVeK7tLlwm3xEFuxkw25cEgGUe7fRDORWSua3EL0p4hLHkFeNL5Zj879xceNCeDIsUEiRK0gaC0DovjpEhmrtjo5at7ymeSZENBTt6rfP5LNhLPfJbMYmRFf0ChOXwn8mOzwtLcWCJlgzMCBRgekwEfZ72n7W4pOXZXECif_tcfePp2a1Lz_qR1JBrllGCdVyBzbJuTPZDnseDYK0wAUL9Vn5p01C1g45NqfnP4Lg7y2l0NbvgB5treV3RENAlDnU0KOMBBPYzCR3b-gGnvZOYPXZx82x6sb4MY1FuPB7PxFk5qG2Bb4hJwwlVCgqcY7KnZgprkRXTjPdiHjoJ5EKclRsOgLRCuzoTQ2d6-qHPWKsRMPTzX80GLMf4RHle_VqsRk5CIeMyIrLOIy0CsExmRgGk2FQdKjZIbtewI_zIonqZa_-YRgx0L9SXABM90CtxoOCU7gZR4Yfgi17NPJ09GT5Y9jQqlWlbBXjDk65Ist--r1ya3nVP2cH4uQhXOQ02hI9tmS7JIPnnOIqI=w1298-h738-no)

    
## Endpoints
The table below specifies all the API endpoints available in the current build of the project, additional routes may be added in the future, but for now, this is the current set of routes.

| Name | Description | HTTP Verb | API Route | Token required
| --- | --- | --- | --- | --
| Register | Registers the user | POST | `/api/users/register` | No
| Login | Authenticates and generates a JWT | POST | `/api/users/login`| No
| Current | Gets the authenticated user's details | GET | `/api/users/me` | Yes
| Update user | Updates the current user's details | PUT | `/api/users/` | Yes
| Delete user | Deletes the current user's details | DELETE | `/api/users/` | Yes


## Deployment notes
To use the API, you can deploy it to a cloud service such as the examples below
* [Heroku](https://www.heroku.com/)
* [AWS](https://aws.amazon.com/)
* [DigitalOcean](https://www.digitalocean.com/)

**NOTE**: Configuration may differ; this application is intended for deployment on DigitalOcean. Please refer to the services documentation for help setting up.

## Contributing
### Reporting issues
If you find any problems while using the API, report them [here](https://github.com/AlexMachin1997/RESTful-API-Interface/issues), and I will address them as quick as I can.

### Feature requests
If you would like to request features for future versions of the application again, please post them [here](https://github.com/AlexMachin1997/RESTful-API-Interface/issues). When posting ideas ensure the functionality is explained to provide any developers contributing to the project know what to implement.

# Project Information
### Author information
Alex Machin

If you want to connect with me on my professional social network platforms feel free to use the links located below, but please don't abuse them.
* [LinkedIn](https://www.linkedin.com/in/alex-machin/)
* [Twitter](https://twitter.com/AlexMachin97)

###  API Version
The application is currently at version 1.4, with each feature added it will increment based on these [guidelines](https://docs.npmjs.com/about-semantic-versioning)

### Project Licence information
This project is licensed under the MIT License, for more details about the API refer to the LICENCE.md file located within the project.