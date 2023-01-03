const express = require('express');
const moongose = require('mongoose');
var cors = require('cors');

// inclúyelos antes de otras rutas
app.use(cors());
app.options('*', cors()); //habilitar las solicitudes de todas las rutas

const { PORT = 3000 } = process.env;
const app = express();
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());
//urlencoded() method within express. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
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
