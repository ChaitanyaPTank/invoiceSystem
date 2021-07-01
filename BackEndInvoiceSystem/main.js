const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const CORS = require('cors');
require('dotenv').config();

// routes
const routes = require('./routes');

// CONFIG Variables
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;

// connect to DB
mongoose.connect(`mongodb://localhost:27017/${DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw new Error(err);
    }
})

const app = express();
app.use(CORS())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    return res.status(200).send('Working');
});

app.use('/api/', routes);

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});
