## RESTful-API-Interface for a React-Native client

This project is a simple RESTful API, it can be integrated with any of the following projects:
* Native Mobile Applications
* Hybrid-Native Applications
* Hybrid-Web Appliations
* Progressive Web Applications

# Purpose of the API
The overall purpose of this project is to provide any application with the functionlaity to integrate with a NoSQL database like [MongoDB](https://www.mongodb.com/). Though the application can integrate with most forms of application for my personal usage it will be integrated with a cross-platform tool know as [React-Native](https://facebook.github.io/react-native/).

# The technologies used for this RESTful API:
* [NodeJS](https://nodejs.org/en/) - Allows JavaScript to be executed on the server-side of an application, one language to rule them all.
* [NPM](https://www.npmjs.com/)  - NodeJS package manager, dependencies can be downloaded from the popular registry
* [MongoDB](https://www.mongodb.com/) - The database which is being used
* [Mlab](https://mlab.com/) - The cloud solution for MongoDB
* [JSON Web Token (JWT)](https://jwt.io/) - Generates a secure authentication and authroization token.
* [Joi](https://github.com/hapijs/joi) - Used to validate objects
* [lodash](https://lodash.com/) - Small JavaScript utilty library

# Getting started with the API
* Clone the project to your development enviroment by using "git remote add origin `https://github.com/AlexMachin1997/RESTful-API-Interface.git`

* Install all dependencies for the application by issuing thhis command `npm install`, this will fetch all of the dependencies if you are connected to the internet and have permission **(Excludes nodemon, this wil be installed seperately later)**

* Create a [mlab account](https://mlab.com/signup/) and create and perform the following (If I have given you THE enviroment variables for an exisitng database skip this part):
    * Create a database
    * Create a user for the database
    * **Remember the username and password for later, its required to connect to the datbase**

* Install and configure an API development area like [Postman](https://www.getpostman.com/):
    * When the server is active you can use the express routes to retrive, update, delete and add data.
    * When sending new or updating an object you will need to send a payload of data, to see the 
    * **Remember**  set the text to JSON for syntax highlighting

* Enviroment variables setup:
    * Create a variable name mongoURL, and the database URL should be copied from MLab
    * Add the user name and password for the datatbase user ()
    * Once the enviroment variable is present all the enviroment variables have been created

* Starting the server:
    * Issue the command `npm install nodemon`, this will allow the server to run and when changes are made they are injected and the server is quickly restarted.
    * Issue the command `npm start`, this will start the server up and changes can be made, the plugin will then restart.

# API endpoints
The table below specific all the API endpoints avaliable in the current build of the project, additional routes may be added in the futute, but for now this is the current set of routes.

**Additional notes:** 
Since JWT tokens are used for authentication and authorization, a logout route is not required this is performed in the client the API is consumed in. 


| Name | Description | HTTP Verb | API Route | Token required
| --- | --- | --- | --- | --
| Register | Registers the user | GET | `/api/users` | No
| Login | Logs the user in and generates token | POST | `/api/users`| No
| Current | Gets the authenticated users details | GET | `/api/users/me` | Yes
| Update user | Updates the current user details | PUT | `/api/users/:id` | Yes
| Delete user | Updates the current user details | DELETE | `/api/users/:id` | Yes


# Deployment
To use the API you can deploy it to a cloud service such as the examples below
* [Heroku](https://www.heroku.com/)
* [AWS](https://aws.amazon.com/)
* [DigitalOcean](https://www.digitalocean.com/)

**NOTE:** Configruation may differ, this application is intended for deployment on DigitalOcean. Please refer to the services documentation for help setting up.

# Reporting problems
If you find any problems whilst using the API report them [here](https://github.com/AlexMachin1997/RESTful-API-Interface/issues) and I will address them as quick as I can.

# Feature requests
If you would like to request features for future versions of the application again, please post them [here](https://github.com/AlexMachin1997/RESTful-API-Interface/issues). When posting ideas ensure the functionlaity is explained to ensure any developers contributing to the project know what to implimnet.

## App Info
### Author
Alex Machin

If you want to connect with me on my proffesional social network platforms feel free to use the links located below, but please don't abuse them or annoy me.
* [LinkedIn](https://www.linkedin.com/in/alex-machin/)
* [Twitter](https://twitter.com/AlexMachin97)

### API Version
The application is currently at version 1.0, with each feature added it will increment based on these [guidelines](https://docs.npmjs.com/about-semantic-versioning)

### Project Licence information
This project is licensed under the MIT License, for more information refer to the LICENCE.md file located within the project.









