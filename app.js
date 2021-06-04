const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.route');
const mongoDb = require('./mongodb/mongodb.connect')

mongoDb.connect();
app.use(express.json());

app.use('/to-dos', todoRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({message: error.message})
});

module.exports = app;