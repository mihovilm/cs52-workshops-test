# starter express app template

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)


## Actual tutorial

https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8
We need  PG

### Open Terminal
`brew install postgresql`

`brew services start postgresql`

psql is the PostgreSQL interactive terminal. Running `psql` will connect you to a PostgreSQL host. Running `psql --help` will give you more information about the available options for connecting with psql.

We’ll just connect to the default postgres database with the default login information - no option flags.
`psql postgres`

You’ll see that we’ve entered into a new connection. We’re now inside psql in the postgres database. The prompt ends with a `#` to denote that we're logged in as the superuser, or root.

Commands within psql start with a backslash (\). To test our first command, we can ensure what database, user, and port we've connected to by using the \conninfo command.

```
\q | Exit psql connection
\c | Connect to a new database
\dt | List all tables
\du | List all roles
\list | List databases
```
```
postgres-# \du
                                   List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 mihovilm  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

```

First, we’ll create a role called `me` and give it a password of `password`. A role can function as a user or a group, so in this case, we'll be using it as a user.

`CREATE ROLE me WITH LOGIN PASSWORD 'password';`
`CREATE ROLE postgres SUPERUSER;`

We want me to be able to create a database.

`ALTER ROLE me CREATEDB;`
`ALTER ROLE postgres SUPERUSER;`
`du`

```
                                   List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 me        | Create DB                                                  | {}
 mihovilm  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
```

`\q`

We’re back in our computer’s default Terminal connection. Now we’ll connect postgres with me.

`psql -d postgres -U me`

Instead of postgres=#, our prompt shows postgres=> now, meaning we're no longer logged in as a superuser.

### Create a database

`CREATE DATABASE polls;`
`\list`
`quit`


### Sequelize
Cd to the workshop directory.

`brew upgrade node`
`yarn install`
`yarn add sequelize pg pg-hstore`

#### Part 1

Paste into `src/models/index.js` where the Part 1 comment is.
Change 'database', 'username', 'password' to whatever you set in the PG part.

```
const db = new Sequelize('postgres://username:password@localhost:5432/database');
```
Eg. `'polls', 'me', 'password'` So you end up with:

`const db = new Sequelize('postgres://me:password@localhost:5432/polls');`

This connects to the PG with a new instance of Sequelize. The address localhost:5432 works because we kept running postgres as a service in brew!


#### Part 2 - models

Under src/models create poll.js, author.js.

Into `poll.js` paste:






