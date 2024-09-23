const express = require('express');
const routes = require('./routes/routing')
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose')



const db = mongoose.connection;

db.on('error', (error) => console.error('connection error', error))
db.once('open', () => {
    console.log('connected to MongoDB')

})

//mongoose.connect('mongodb+srv://talaj794:clW9xbmlgahpoDWQ@cluster0.hblbj.mongodb.net/');
app.listen(2222, () => {
    console.log('Server is running on port 2222');
});

mongoose.connect('mongodb://localhost:27017/downloads')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/', routes);