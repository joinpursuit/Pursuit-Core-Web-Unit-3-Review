# Todos API
This Server/API is intended to be used by the fellows to practice making network requests, learn about HTTP status codes, their uses and differences, learn about query parameters and body data sent to appropriate endpoints. 

More specifically this server is used for the [`restfulapi_exercise`](https://github.com/joinpursuit/restfulapi_exercise).

## Dependencies
  * `node`
  * `npm`
  * PostgreSQL / `psql`
  * Postman

## Setup

### Local

1. After cloning this repo install dependencies with:

    ```sh
    npm install
    ```

2. Make sure you have Postgres running in your machine. Revise [`db/todos_api_db.sql`](db/todos_api_db.sql)
and make sure the lines that drop, create and connect to a database are uncommented. Create database and 
tables with:

    ```sh
    psql -f db/todos_api_db.sql
    ```
3. Dev server will run at `http://localhost:3100`. Start it with:

    ```sh
    npm run start:dev
    ```

### Deployment
This server is to be deployed to Heroku. You will need a Heroku account and the Heroku
CLI to follow this steps.

1. Once this repository has been cloned to your machine and while you are inside its
directory. To create a Heroku app and automatically add a `heroku` remote to your repo, run. 
    ```sh
    heroku apps:create <your_app_name>
    ```

2. Provide the Heroku app with a Postgres database with
    ```sh
    heroku addons:create heroku-postgresql:hobby-dev -a <your_app_name>
    ```

3. To create the tables in the database, take a look at [`db/todos_api_db.sql`](db/todos_api_db.sql). For local development you would want to leave uncommented the lines that refer to creating, dropping and connecting to a database. For deployment you should comment those lines and leave only the drop and create table lines. Find more [here](https://devcenter.heroku.com/articles/heroku-postgresql).
    ```sh
    cat db/todos_api_db.sql | heroku pg:psql -a <your_app_name>
    ```

4. Push this repo to Heroku to be deployed
    ```sh
    git push heroku master 
    ```
    or if you want to push a feature branch of the repo
    ```sh
    git push heroku feature_branch:master
    ```
5. To test the API using Postman create a Postman environment and add the environment variable `server_address`. Set it's value to the url heroku gave your app e.g. `https://fsw62-todos-api.herokuapp.com`. More on this [here](https://learning.getpostman.com/docs/postman/environments_and_globals/intro_to_environments_and_globals/).

    Test the API with this Postman collection. Click to Download: 
    
    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1142998a489d1da482b0)

6. Once verified what everything works share the url with the class and let them play with it. Your url should look something similar to: `https://fsw62-todos-api2.herokuapp.com`

## API Docs

### Resources
* users
* todos

### Endpoints

#### Users
| Method | Endpoint                 | 
|--------|--------------------------|
| `GET`  | `/users`                 |
| `GET`  | `/users/<user-username>` |
| `POST` | `/users/signup`          |

#### Todos
| Method   | Endpoint           | Possible Query Params |
|----------|--------------------|-----------------------|
| `GET`    | `/todos`           | `owner=<username>`, `completed=<true\|false>`
| `POST`   | `/todos`           ||
| `GET`    | `/todos/<todo-id>` ||
| `PUT`    | `/todos/<todo-id>` ||
| `PATCH`  | `/todos/<todo-id>` ||
| `DELETE` | `/todos/<todo-id>` ||

### Final notes
1. The exercise asks of the fellows/students to find how many http status codes they can find by using this api. Later on I make a poll on Slack and ask how many they have found and revealing how many there are by saying: `There are /6 status codes. How many have you found?`. What appears to be a typo `/6` should lead them to the easter egg endpoint that is mentioned in the exercise instructions.
2. The easter egg I put involves the payment of $10 to whoever finds it first. This might not be what you want, so make sure to take a look at [`routes/index.js`](routes/index.js) and modify it.
