1. First update the env information ; about database variabble: **Match with you own DBMS**
2. cd  project/backend
3. npm install
4. node  ./src\/atabase/createDatabase.js


**Folder/file  && their whys**

1. config/config.json  : to configer express ; only  to feel the development mode . **note** : 127.0.0.1 it is what we call local host, you can leave it; only username ; password and patabase__ you created on step 4 ; and which kind on DBMS *like mysql*.
2. migrations : help in  in version control ; and changes made by express to reflect into the database with less sql codes, on pc. is for version control too. create tables, constraints inforcement, altering table, even relations.
3. node_modules : generated due to installing dependencies in package.json
4. routes: it is for separating routes as being in server.js the main entry might become too much over time.
5. seeder_backup && seeders : This is due to an issue i faced " running sequelize db:seed:all it was seeding all files in seeders ; for the first file it was ok, but trying to seed the second the , first one was again coming in between. so i used to move all seed into seed_backup, and only deal with on file at a time. After moved of seeds back into seeders."
6. src/models  && src/database : these i don't think thy should be in this structure; but the video i followed, for this part they were using src;
   1. src/model: each file is a table, created using express. and an index.js which combines all models into one export; and create associations among the models.
   2. src/database:
      1. connection.js : it is for connecting to the myspl using express ; but it required you to have the database already created.
      2. createdatabase : this is connect to mysql, not using express; creates a database as it is the .env ; that's it.
7. guide.md: it is this file; for the record of what i did; and what i was thinking of it; for later reference to come up with a report.
8. package-lock-json : i never use it , i don't know it use. what i know is that it comes with package,json , when we do npm init   -y
9. package.json: where general setting of working environment lies ; dependencies, scripts, verions __ for update and all those .....
10. server.js : the main entry to our express server, it is where i impotr modules to serve a given route i will create in their. a backend end point. it is where the routes folder's content get the permision to create routes, form else where.
