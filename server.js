const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const ingredients = require('./routes/api/ingredients');
const food = require('./routes/api/food');
//const upload = require('./routes/api/upload');

const app = express();

app.use('/', express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/ingredients', ingredients);
app.use('/api/food', food);
//app.use('/api/upload', upload);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));