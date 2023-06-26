const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();

const usersRoutes = require('./routes/userRouter');
const mongoose = require('mongoose');
const router = require('./routes/router');


// middleware - code that runs when server gets a request but before it gets passed to the routes
app.use(cors())
app.use(express.json());


// routes middleware
app.use('/', router)

const port = process.env.PORT || 5000;


// connect to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log('App is listening on port ' + port);
    });
  }) 
  .catch(err => console.log(err));




