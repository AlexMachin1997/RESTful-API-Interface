## RESTful-API-Interface for a React-Native client

This project is a simple RESTful API, it can be integrated with any of the following projects:
* Native Mobile Applications
* Hybrid-Native Applications
* Hybrid-Web Appliations
* Progressive Web Applications

# Purpose of the API
The overall purpose of this project is to provide any application with the functionlaity to integrate with a NoSQL database like [MongoDB](https://www.mongodb.com/). Though the application can integrate with most forms of application for my personal usage it will be integrated with a cross-platform tool know as [React-Native](https://facebook.github.io/react-native/).

# The technologies used for this RESTful API:
* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/) 
* [MongoDB](https://www.mongodb.com/)
* [Mlab](https://mlab.com/)
* [JSON Web Token (JWT)](https://jwt.io/)
* [Joi](https://github.com/hapijs/joi)
* [lodasd](https://lodash.com/)

# Getting started with the API
* Clone the project to your development enviroment by using "git remote add origin `https://github.com/AlexMachin1997/RESTful-API-Interface.git`

* Install all dependencies for the application by issuing thhis command `npm install`, this will fetch all of the dependencies if you are connected to the internet and have permission.

* Create a [mlab account](https://mlab.com/signup/) and create and perform the following (If I have given you some enviroment variables skip this part):
    * Create a database
    * Create a user for the database
    * Remember the username and password for later, its required to connect to the datbase

* Install and configure an API development area like [Postman](https://www.getpostman.com/)


* Locate the enviroment variables, the following will be required for the API to work
    * MONGO-DB-URL
    * PORT
    
* Run the start command which is `npm start`, this will start the nodemon server. To test the applicaion is running visit the test route via your API development enviroment, hint it's `http://localhost:port number in .env/test`. It should return a message from the API.

# API endpoints
The table below specific all the API endpoints avaliable in the current build of the project, additional routes may be added in the futute, but for now this is the current set of routes.

**Additional notes:** 
Since JWT tokens are used for authentication and authorization, a logout route is not required this is performed in the client the API is consumed in. 


| Name | Description | HTTP Verb | API Route | Token required
| --- | --- | --- | --- | --
| Register | Registers the user | GET | `/api/register` | No
| Login | Logs the user in and generates token | POST | `/api/login`| No
| Current | Gets the authenticated users details | GET | `/current` | Yes
| Update user | Updates the current user details | PUT | `/api/user/:id` | Yes
| Delete user | Updates the current user details | DELETE | `/api/user/:id` | Yes


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
[LinkedIn](https://www.linkedin.com/in/alex-machin/)
[Twitter](https://twitter.com/AlexMachin97)

### Version
1.0.0

### License
This project is licensed under the MIT License









