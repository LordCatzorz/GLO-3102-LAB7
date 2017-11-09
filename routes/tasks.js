var uuidGenerator = require('uuid/v4');
var allTheTasks = [];

function getLocalUserTasks(userId) {
    return allTheTasks.filter(function(task) {
        return task.userId === userId;
    });
}

exports.getUserTasks = function (req, res) {
    var userTasks = getLocalUserTasks(req.params.userId);

    res.status(200).send({
        tasks: userTasks
    });
};

exports.addUserTask = function (req, res) {
    if (req.body.name === undefined) {
        res.status(412).send({
            errorCode: 'TASK_NAME_MISSING',
            message: 'A task needs a name'
        });
    } else {
        var newTask = {
            userId: req.params.userId,
            id: uuidGenerator(),
            name: req.body.name
        };
        allTheTasks.push(newTask);

        var returnedTask = {
            id: newTask.id,
            name: newTask.name
        };

        res.status(201).send(returnedTask);
    }
};

exports.editUserTask = function (req, res) {
    if (req.body.name === undefined) {
        res.status(412).send({
            errorCode: 'TASK_NAME_MISSING',
            message: 'A task needs a name'
        });
    } else {
        var userTasks = getLocalUserTasks(req.params.userId);
        var theTaskArray = userTasks.filter(function(task) {
            return task.id === req.params.taskId;
        });

        if (theTaskArray.length !== 1) {
            res.status(400).send('Task with id ' + req.params.taskId + ' for user ' + req.params.userId + ' doesn\'t exist.');
        } else {
            theTaskArray[0].name = req.body.name;

            var returnedTask = {
                id: theTaskArray[0].id,
                name: theTaskArray[0].name
            };

            res.status(200).send(returnedTask)
        }
    }
};

exports.deleteUserTask = function (req, res) {
    var userTasks = getLocalUserTasks(req.params.userId);
    var theTaskArray = userTasks.filter(function(task) {
        return task.id === req.params.taskId;
    });

    if (theTaskArray.length !== 1) {
        res.status(400).send('Task with id ' + req.params.taskId + ' for user ' + req.params.userId + ' doesn\'t exist.');
    } else {
        console.log('Before');
        console.log(allTheTasks);
        allTheTasks = allTheTasks.filter(function(task) {
           return task.id !== theTaskArray[0].id;
        });
        console.log('After');
        console.log(allTheTasks);
        res.status(200).send();
    }
};