# Unit 3 Full Stack App Building Review 

On this review you are being called onto a project that needs your help. You are hired as part of the Back-End developer team for a productivity app called "Just Todo It". It turns out the project has a lot of bugs and some routes are broken, part of the database have not been built etc. Your job is to jump in and fix the issues as well as built what is necessary. 

The purpose of this review exercises are to practice dealing with a web server built with Express.js, interact with a Postgres Databases, make and respond to network requests, review HTTP status codes, review query and URL parameters and others.

## Setup
* Fork and clone this repo
* Install dependencies `npm install`
* Run tests `npm test`

## API Docs

### Resources
* users
* todos
* tags

### Endpoints

#### Users
| Method | Endpoint                 |
| ------ | ------------------------ |
| `GET`  | `/users`                 |
| `GET`  | `/users/<user-username>` |
| `POST` | `/users/signup`          |

#### Todos
| Method   | Endpoint           | Description                 |
| -------- | ------------------ | --------------------------- |
| `GET`    | `/todos`           | Get all todos               |
| `POST`   | `/todos`           | Add a new todo              |
| `GET`    | `/todos/<todo-id>` | Get a todo by id            |
| `PUT`    | `/todos/<todo-id>` | Update/Replace a todo by id |
| `PATCH`  | `/todos/<todo-id>` | Update a todo by id         |
| `DELETE` | `/todos/<todo-id>` | Delete a todo by id         |

  _Possible Query Params_
  * `owner=<username>`
  * `completed=<true|false>` 

## Fix Exercises
* Registering a user with an already-taken username is possible when it shouldn't. Fix this. Think of database constraints. 
* Adding a todo with a username that doesn't exist should not be allowed. Think of database constraints. 
* Getting all todos is returning status code `201` which is wrong. It should return status code `200` `ok`. 
* Deleting a todo is catastrophically deleting all the todos in the table. Please fix this.
* Trying to remove a todo by an id that doesn't exist is returning an empty object with status code `418`. It should return `404` and and the following object:
    ```
    { 
      "payload": "Todo not found",
      "err": true
    }
    ```

## Expansion Exercises
The team wants to add the ability to tag todos. For instance a todo `Buy Milk` could be tagged `Grocery Shoppings` or a todo `Clean room` could be tagged `Chores` etc. To accomplish this the team asks you implement the following API with these HTTP methods and routes.

### Todos
| Method | Endpoint                        | Description                          |
| ------ | ------------------------------- | ------------------------------------ |
| `POST` | `/todos/<todo-id>/tag/<tag-id>` | Tag or assign a tag to an todo       |
| `GET`  | `/todos/tags/<tag-id>`          | Get all todos with tag id `<tag-id>` |

### Tags
| Method   | Endpoint         | Description   |
| -------- | ---------------- | ------------- |
| `GET`    | `/tags`          | Get all tags  |
| `POST`   | `/tags`          | Add a new tag |
| `PATCH`  | `/tags/<tag-id>` | Update a tag  |
| `DELETE` | `/tags/<tag-id>` | Delete a tag  |


#### Tasks
* Make the edit to add two tables to the database. 
  * The `tags` table will store tags. Tags have only `id`, `owner` and `name` properties/columns. The `id` should be given by the database.
  * The `todos_tags` is what is known as a join table. This table will store the relationship between todos and tags. A row of this table should look like:

  | id  | todo_id | tag_id |
  | --- | ------- | ------ |
  | 1   | 1       | 2      |
  | 2   | 3       | 4      |
  | 3   | 5       | 2      |
  
  **Note** This is necessary because a todo can have multiple tags and a tag can have multiple todos.
* The router for `/tags` is in place but currently doesn't handle any requests. 
  * Implement `POST` `/tags` to retrieve create a new tag. Remember to that tags need to have `name` and `owner`
  * Implement `GET` `/tags` to retrieve all the tags
  * Implement `PATCH` `/tags/:tag_id` to update a tags
  * Implement `DELETE` `/tags/:tag_id` to delete a tag. 
* Modify the `todos` router to handle
    * `POST` `/todos/<todo-id>/tag/<tag-id>` to assign a tag to an todo       
    * `GET`  `/todos/tags/<tag-id>` to get all todos with tag id `<tag-id>` |
