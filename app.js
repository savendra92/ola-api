const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/sample";

const routes = require('./routes/routes');


app.use(express.urlencoded({ extended: false, limit: '5mb'}, true));
app.use(express.json({ limit: '5mb' }));

/* cors */

app.use((req, res, next) => {
    
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// server your css as static
// app.use(express.static('public'))
app.use(routes);

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log("Server listening on port " + port);

    });

  })
  .catch(err => console.log(err)); 
