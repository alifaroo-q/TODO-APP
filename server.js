const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");

app = express();
cors(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/signup.html'))
});

app.get('/todos', (req, res) => {

    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
        .sendFile(path.join(__dirname, 'public/pages/todos.html'));

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});