const express = require('express');
const cors = require ('cors');
const app = express();
app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');


const errorHandler = require('./error/err')

const eventhandler = require('./loger/eventhandler')

const mongoLogger = require("./loger/mongologger");


const userrout = require("./routes/UsersRoutes")
const specialityrout = require('./routes/SpecialitiesRoutes')
const universityrout = require("./routes/UniversitiesRoutes")
const facultyrout = require("./routes/FacultiesRoutes")
const reviewrout = require("./routes/ReviewsRoutes")
const user_typerout = require("./routes/User_TypesRoutes")
const typerout = require("./routes/TypesRoutes")
const requestrout = require('./routes/RequestsRoutes')
const disciplinerout = require('./routes/DisciplinesRoutes')
const discipline_typerout = require('./routes/Discipline_TypesRoutes')
const authRoutes = require('./routes/auth')

var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/logiAUC";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(eventhandler)

app.use(express.json());
app.use('/auth', authRoutes);

app.use('/users', userrout);
app.use('/user/:id', userrout);

app.use('/universities', universityrout);
app.use('/university/:id', universityrout);

app.use('/specialities', specialityrout);
app.use('/speciality/:id', specialityrout);

app.use('/faculties', facultyrout);
app.use('/faculty/:id', facultyrout);

app.use('/reviews', reviewrout);
app.use('/review/:id', reviewrout);

app.use('/user_types', user_typerout);
app.use('/user_type/:id', user_typerout);

app.use('/types', typerout);
app.use('/types/:id', typerout);

app.use('/requests', requestrout);
app.use('/request/:id', requestrout);

app.use('/disciplines', disciplinerout);
app.use('/discipline/:id', disciplinerout);

app.use('/discipline_types', discipline_typerout);
app.use('/discipline_type/:id', discipline_typerout);


const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres_2', 'postgres', '135135', {
  host: 'localhost',
  dialect: 'postgres',
});

const PORT = 3001;

app.use(errorHandler);

app.use('/documents', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  const err = new Error('Неверный запрос');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const error = {
      success: false,
      status: err.status ||  404,
      message: err.message || 'Error'
  };

  mongoLogger.storeError(error);
  console.log('Error was stored');

  res.status(error.status).json({
      message: error.message,
      status: error.status
  });
});

const server = app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error'))
  module.exports = server;