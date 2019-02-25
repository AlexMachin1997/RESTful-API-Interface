## RESTful-API-Interface for a React-Native client
The repository consists of a Node.JS RESTful application programming interface(API) which will perform CRUD operations for a food allergy mobile application which will be produced using [React-Native](https://facebook.github.io/react-native/) app. 

As part of the README file it will describe and explain the following:
* Purpose of the API
* Core features
* Technologies used
* Getting started
* API Endpoints
* Deployment notes
* Reporting issues
* Feature requests
* Project information


# Purpose
The API will play a vital role when integrated with a client-side mobile application such as the allergy application which will be produced. It will allow users to register and login to the application, though for this to happen a centralised database will be required. However, the database won't be much use if the mobile application can't communicate with the client app; this is where the API will play its role, it will allow HTTP requests to be made.

# Core features
As of the current version of the API, it is currently capable of performing the following tasks:
* Authenticating existing users and generating a JWT token for session persistence and authorization
* Authorising users to access specific endpoints through a JWT token
* Registering new users
* Querying for the currently logged in users data
* Updating user information
* Deleting users who no longer want an account

# Technologies used:
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
* [Helmet](https://www.npmjs.com/package/helmet) - Secures expresses HTTP headers


# Getting started with the API
* Clone the project to your development environment by using "git remote add origin `https://github.com/AlexMachin1997/RESTful-API-Interface.git`

* Install all dependencies for the application by issuing this command `npm install`; this will fetch all of the dependencies **(Excludes nodemon, this will be installed separately later)**

* Create a [mlab account](https://mlab.com/signup/) and create and perform the following (If I have given you the enviroment variables for an existing database skip this part):
    * Create a database
    * Create a user for the database
    * **Remember the username and password for later, its required to connect to the database**

* Install and configure an API development area like [Postman](https://www.getpostman.com/):
    * When the server is active you can use the express routes to retrieve, update, delete and add data.
    * When sending new or updating an object, you will need to submit a payload of data, to see the 
    * **Remember**  set the text to JSON for syntax highlighting

* Enviroment variables setup:
    * Locate the config directory, create a file named keys_dev.js and copy the context from keys_prod.js and make the following changes:
        * The  `mongoURL` should be a string which is the mlab database with the database username and password **The passwords you created earlier**
        * The `secret` can be any string; it will be used to identify the JWT during development and production 

* Starting the server:
    * Issue `npm install nodemon`, this will allow the server to run, and when changes are made they are injected, and the server is quickly restarted.
    
    * Issue `npm start`, this will start the server up, and changes can be made, the plugin will then restart.

# API endpoints
The table below specifies all the API endpoints available in the current build of the project, additional routes may be added in the future, but for now, this is the current set of routes.

**Additional notes:** 
Since JWT tokens are used for authentication and authorization, a logout route is not required this is performed in the client the API is consumed in. 


| Name | Description | HTTP Verb | API Route | Token required
| --- | --- | --- | --- | --
| Register | Registers the user | POST | `/api/users/register` | No
| Login | Authenticates and generates a JWT | POST | `/api/users/login`| No
| Current | Gets the authenticated user's details | GET | `/api/users/me` | Yes
| Update user | Updates the current user's details | PUT | `/api/users/` | Yes
| Delete user | Deletes the current user's details | DELETE | `/api/users/` | Yes


# Deployment notes
To use the API, you can deploy it to a cloud service such as the examples below
* [Heroku](https://www.heroku.com/)
* [AWS](https://aws.amazon.com/)
* [DigitalOcean](https://www.digitalocean.com/)

**NOTE:** Configuration may differ; this application is intended for deployment on DigitalOcean. Please refer to the services documentation for help setting up.

# Reporting issues
If you find any problems while using the API report them [here](https://github.com/AlexMachin1997/RESTful-API-Interface/issues) and I will address them as quick as I can.

# Feature requests
If you would like to request features for future versions of the application again, please post them [here](https://github.com/AlexMachin1997/RESTful-API-Interface/issues). When posting ideas ensure the functionality is explained to provide any developers contributing to the project know what to implement.

## Project Information
### Author
Alex Machin

If you want to connect with me on my professional social network platforms feel free to use the links located below, but please don't abuse them or annoy me.
* [LinkedIn](https://www.linkedin.com/in/alex-machin/)
* [Twitter](https://twitter.com/AlexMachin97)

## API Version
The application is currently at version 1.4, with each feature added it will increment based on these [guidelines](https://docs.npmjs.com/about-semantic-versioning)

## Project Licence information
This project is licensed under the MIT License, for more details  about the API refer to the LICENCE.md file located within the project.