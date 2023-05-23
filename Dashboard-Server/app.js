const express = require('express')
const app = express();
require('dotenv').config();

const usersRoutes = require('./routes/userRouter');
const mongoose = require('mongoose');


// middleware - code that runs when server gets a request but before it gets passed to the routes
app.use(express.json());
app.use((req, res, next) => {
  // run code for every single request
  next();
});


// routes
app.use('/api/user', usersRoutes);

const port = process.env.PORT || 5000;


// connect to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log('App is listening on port ' + port);
    });
  }) 
  .catch(err => console.log(err));




