# MediaMonks Recruitment Assignment
Hi!
## Requirements for run this project
* NodeJs version >=10.13.0
## Instructions for run this service:
* On your console run npm install
* Environment setup:
    * Development:
        * For run this application in your local scope without a MySQL server you can use the development environment and then use a sqlite3 db
        * For this, set the NODE_ENV value in the .env file (at the root of the project) as 'development'
    * Production:
        * First of all, set the NODE_ENV value in the .env file (at the root of the project) as 'production'
        * For run this application in a productive environment you will need a MySQL server, a database named 'sam_mmra', ip, port, user, password. Set this settings in the production object located at src/db/connector.js
* You can run test running the command 'npm test'
* For start the service run 'npm start'

Enjoy!