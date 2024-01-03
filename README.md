# express-mongodb

```
Up application:
docker-compose -f developer.docker-compose.yml up -d

Down application:
docker-compose -f developer.docker-compose.yml down -v --rmi all

Steps to login in mongo-express:

1. Open mongo-express in the web browser by visiting http://localhost:8084.
2. To log in, fill in the following details
> Username : admin
> Password : pass

What are the drawbacks of Mongoose?

On the downside, learning mongoose can take some time, and has some limitations in handling schemas that are quite complex.
However, if your collection schema is unpredictable, or you want a Mongo-shell like experience inside Node. js,
then go ahead and use the mongodb driver. It is the simplest to pick up.

What is NoSQL injection ?

It's a vulnerability where an attacker is able to interfere with the queries that an application makes to a NoSQL database.
NoSQL injection may enable an attacker to:
1. Bypass authentication or protection mechanisms.
2. Extract or edit data.
3. Cause a denial of service.
4. Execute code on the server

Reference:

MongoDB and Node.js Tutorial - CRUD Operations
https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/#create
https://github.com/mongodb-developer/nodejs-quickstart/blob/master/create.js

How to Use TypeScript with MongoDB Atlas
https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial

NoSQL, MongoDB, Mongo Express, and Docker
https://medium.com/javarevisited/nosql-mongodb-mongo-express-and-docker-d6a4355ff395

Express.JS + mongoDB + mongo-express on the docker compose
https://qiita.com/iwasaki-hub/items/cc1d9bffd382f6ccd5db

NoSQL injection
https://medium.com/@BhaktiKhedkar/nosql-injection-558337ea7d6c
```
