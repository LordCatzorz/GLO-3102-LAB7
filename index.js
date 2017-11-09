var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var users = require('./routes/users');
var tasks = require('./routes/tasks');

var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
};

var app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(412).send({
            errorCode: 'PARSE_ERROR',
            message: 'Arguments could not be parsed, make sure request is valid.'
        });
    } else {
        res.status(500).send('Something broke!', error);
    }
});

app.post('/users', users.createUser);

app.get('/:userId/tasks', tasks.getUserTasks);
app.post('/:userId/tasks', tasks.addUserTask);
app.put('/:userId/tasks/:taskId', tasks.editUserTask);
app.delete('/:userId/tasks/:taskId', tasks.deleteUserTask);

app.listen(3000);