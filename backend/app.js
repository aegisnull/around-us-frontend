const express = require('express');
const moongose = require('mongoose');
const cors = require('cors');

const { PORT = 3001 } = process.env;

const app = express();

// inclúyelos antes de otras rutas
app.use(cors());
app.options('*', cors()); // habilitar las solicitudes de todas las rutas

// express.json() is a method to recognize the incoming Request Object as a JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection function to MongoDB Atlas cluster using mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the application on connection error
  }
};

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use('/cards', cardRouter);
app.use('/users', usersRouter);

// set route for Non-existent address or localhost:3000
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

// Port number for the server to listen on
const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  connectDB();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

const { login, createUser } = require('./controllers/users');

app.post('/signin', login);
app.post('/signup', createUser);

module.exports = { app, server };
