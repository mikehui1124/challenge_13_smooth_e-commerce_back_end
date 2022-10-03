challenge_14_E-commerce Back End

This is a JavaScript source-code for setting up the back end of E-commerce application. It uses Sequelize package to interact with a MySQL database in terms of ORM to support CRUD operations of existing product records in the DB.
The app will be using MySQL and Sequelize of NPM as dependency. The app will be invoked by using the following commands:

“node ./seeds/index.js”

“node index.js”

The completed JavaScript source-code, table models, api routes and package log (ie package.json file) are available in the following GitHub repo as Master branch,

•	https://github.com/mikehui1124/challenge_13_smooth_e-commerce_back_end

The walkthrough video demonstrates the workflow of the tracker is available as part 1 & part 2 as follows.

•	https://drive.google.com/file/d/11F0Gmllj9znPCOaPTD7IFbkIAxClzRd9/view

•	https://drive.google.com/file/d/1ElEfmACHz416UYVA-sl5M9nxXChoUDQ_/view

Description

The e-commerce application has a database with 3 tables of records, namely

-	Products,  -categories and -tags

The back-end will setup these 3 models and their dependency using Sequalize as ORM interface, and then query the existing records from the DB using Sequalize methods. Many-to-many relationship between Products and Tags models will be established using Sequalize.
The defined routes of CRUD operations for each table will be tested for correctness using Insonmia Core.


Snapshot of Typical response data from a database query

![image](https://user-images.githubusercontent.com/105307687/193681269-05cafa79-443c-4b46-b544-d5cda553f2e8.png)

Acceptance criteria

The application will meet the following criteria expected by an app user,

•	I’m able to able to connect to a database using Sequelize when adding my database name, MySQL username, and MySQL password to an environment variable file.

•	When enter schema and seed commands, a development database is created and is seeded with test data.

•	When enter the command to invoke the application, my server is started and the Sequelize models are synced to the MySQL database

•	When opening API GET routes in Insomnia Core for categories, products, or tags, the data for each of these routes is displayed in a formatted JSON

•	When test API POST, PUT, and DELETE routes in Insomnia Core, I am able to successfully create, update, and delete data in my database

•	When choose to update an employee’s role, I am prompted to select an employee to update and their new role and this information is updated in the database

