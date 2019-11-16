# Unit 3 Full Stack App Building Review 

On this review you are being called onto a project that needs your help. You are hired as part of the Back-End developer team for a productivity app called "Just Todo It". It turns out the project has a lot of bugs and some routes are broken, part of the database have not been built etc. Your job is to jump in and fix the issues as well as built what is necessary. 

The purpose of this review exercises are to practice dealing with a web server built with Express.js, interact with a Postgres Databases, make and respond to network requests, review HTTP status codes, review query and URL parameters and others.

## Setup

## API Docs

### Resources
* users
* todos

### Endpoints

#### Users
| Method | Endpoint                 |
| ------ | ------------------------ |
| `GET`  | `/users`                 |
| `GET`  | `/users/<user-username>` |
| `POST` | `/users/signup`          |

#### Todos
| Method   | Endpoint           | Possible Query Params                         |
| -------- | ------------------ | --------------------------------------------- |
| `GET`    | `/todos`           | `owner=<username>`, `completed=<true\|false>` |
| `POST`   | `/todos`           |                                               |
| `GET`    | `/todos/<todo-id>` |                                               |
| `PUT`    | `/todos/<todo-id>` |                                               |
| `PATCH`  | `/todos/<todo-id>` |                                               |
| `DELETE` | `/todos/<todo-id>` |                                               |

## Exercises
