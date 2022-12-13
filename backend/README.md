# Around the U.S. Back End

## About

This project is a back end for the Arount the U.S. app. It's built using Node.js and Express.js. It's connected to a local MongoDB database.

## Features

- routes for users and cards
- controllers for users and cards
- Mongoose Schema for users and cards
- connection to a MongoDB database

## Future Features

- Add authentication and authorization

## Directories

`/controllers` — controllers for users and cards.

`/models` — models for users and cards.

`/routes` — routes for users and cards.

## Running the Project

To run the project, you need to have Node.js and MongoDB installed on your computer.

1. Clone the repository.

2. Install the dependencies.

`npm install`

3. Run the server.

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.

## Dependencies

"express": "^4.18.2",
"mongoose": "^6.7.1"

## Dev Dependencies

"eslint": "^8.26.0",
"eslint-config-airbnb-base": "^15.0.0",
"eslint-plugin-import": "^2.26.0",
"nodemon": "^2.0.20"
