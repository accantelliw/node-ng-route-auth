# node-ng-route-auth

NodeJS + Angular authentication seed app.

## 1. Getting Started

A full-stack application, that implements a JWT authentication process. 

* *Backend*: Node API with JWT token authentication.
* *Frontend*: Angular JS Authentication flow, with a basic Bootstrap layout.
  
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live [system](http://www.google.com).

## 2. Build / Run

### Prerequisities

Install *NPM*, *NodeJS* and *Bower*. Optionally, *Grunt*.

### Installing

Download from Git

    mkdir node-ng-route-auth
    cd node-ng-route-auth
    git clone https://github.com/accantelliw/node-ng-route-auth

### Run

``` node index.js ```

Open ``` http://localhost:5000 ``` 

## 3. Details

### Customize

### Backend

Backend is a NodeJS (+Express) application with:

* Basic user/Roles management
* JWT Access token management (HTTP requests need to have x-access-token header)
* Secured API to be displayed on fronted side
Application data is stored directly in JSON object, database was intentionally not included in this project. 

You can test API with Postman.

Structure:

	app\routes.js               --> express middleware routes
	app\controllers\authCtrl.js --> authentication controller
	app\controllers\dataCtrl.js --> API data controller
	app\helpers\tokenHandler.js --> JWT token management
	app\models\data.js          --> API data store management
	app\models\users.js         --> Users/roles management
	app\utils\common.js         --> Common JSON HTTP response models
	app\utils\utils.js          --> Utilities

### Frontend

Frontend is an Angular SPA (including angular route) with:

* Login page
* Authentication/Authorization pages check
* User profile page

User data is stored in local storage (see public\scripts\services\userData.js).

Structure:

	public\scripts\app.js                       --> Angular app, routes and configuration
	public\scripts\directives.js                --> Directive to fix <a href> issue
	public\scripts\controllers\AppController.js --> Main global controller, handles auth notifications
	public\scripts\controllers\*Controller.js   --> One controller for each page/view
	public\scripts\services\authInterceptor.js  --> Check authentication on each HTTP requests
	public\scripts\services\authService.js      --> Auth API
	public\scripts\services\apiService.js       --> Data API
	public\scripts\services\userData.js         --> user data manangement (session store)
	public\scripts\common\utils.js              --> utilities
	public\index.html                           --> main page
	public\views\*.html                         --> page views 


## 4. Other

### Author

* **Walter Accantelli** [Github](https://github.com/accantelliw)

### Resources

[Making your AngularJS application grunt](http://g00glen00b.be/angular-grunt/)

[Simple AngularJS Authentication with JWT](https://thinkster.io/angularjs-jwt-auth)

[Techniques for authentication in AngularJS applications](https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec#.ag4uas8ql)

### TODO

* Make the application grunt!

### FUTURE

* Same example with AngularJS route-ui / AngularJS 2 / Ember implementation
