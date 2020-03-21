### JemiSMS

JemiSMS-Backend is Webapp API for send mass SMS for marketing which support MoMo(MTN). This project is composed of:
-  1.RESTful node/express API server that serves the backend functionalities of the application
-  2.The UI template (web pages) made in ReactJS that help user interact with the application.

### The UI(web pages) is here

The UI template is deployed to heroku and it is build in ReactJS and can be found on the following link => https://gambino.herokuapp.com/

### JemiSMS-API

Jemi-API is Webapp API for send mass SMS for marketing and Notification is made in nodejs/express API server that helps my JemiSMS https://gambino.herokuapp.com// web application and/or any other third-party applications to get all the RESTFUL functionalities of this service.

## Code style

The style-guide is ESlint-airbnb, and it uses prettier for formatting code. To enable `VS Code + ESLint + prettier` follow the steps below:

- `cd root_directory`
- `yarn add -D prettier eslint eslint eslint-config-prettier eslint-plugin-prettier`
- Create `.eslintrc.json`:`{ "extends": "plugin:prettier/recommended" }`
- In VS Code, `Ctrl + Shift + X`
- Search and install _ESLint_
- Search and install _Prettier Code Formatter_
- Restart VS Code.

### Getting Started

### Clone the latest version of the repository

`git@github.com:olivierhabi/JemiSMS-Backend.git` or `https://github.com/olivierhabi/JemiSMS-Backend.git`

### Change directory

`cd into the project directory`

### Update the environment variables in .env file and rename it to '.env'

`.env`

### Install the project's dependencies with

`yarn` or `npm install`

### Make sure to have the postgreSQL database created for the project

After setting up the database,

- Install the `Sequelize CLI` ==> `https://www.npmjs.com/package/sequelize-cli`
- Run the database migrations with the `db:migrate` command found in `package.json`


### Start the application

`yarn start`

## API Spec

`POST /api/users`: Register a user.

`POST /api/auth/signin`: User can Login.

`GET /api/account`: Loged in User can get his info

`POST /api/contact`: User can save contact.

`GET /api/contact`: User can view saved contact.

`DELETE /api/contact/{id}`: User can delete saved contact.

`PATCH /api/contact/{id}`: User can edit saved contact.

`POST /api/message`: User can send SMS.

`GET /api/message`: User view can his/her sent SMS.

`DELETE /api/message/{id}`: User can delete send SMS.

`POST /api/pay`: User can request payment via Mobile Money(MTN).

`POST /api/balance`: User can increase his/her balance via MoMo(MTN).

`GET /api/balance`: User can check his/her Balance.

`GET /api/history`: User can check his/her account history.

`GET /api/users`: User can check his/her account Information.

`POST /api/users`: User can update his/her account Information.

`POST /api/schedule`: User can schedule SMS to be sent in specific time.

## Licence

[MIT licence](https://github.com/olivierhabi/JemiSMS-Backend/blob/master/LICENSE.md)




