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

moongose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log(err));

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use('/cards', cardRouter);
app.use('/users', usersRouter);

// set route for Non-existent address or localhost:3000
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

const { login, createUser } = require('./controllers/users');

app.post('/signin', login);
app.post('/signup', createUser);
