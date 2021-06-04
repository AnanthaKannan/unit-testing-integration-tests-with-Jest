const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.route');

app.use('/to-dos', todoRoutes)

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.listen(3000, () => {
    // console.log('server running')
});

module.exports = app;