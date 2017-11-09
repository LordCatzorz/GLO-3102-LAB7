var uuidGenerator = require('uuid/v4');

exports.createUser = function (req, res) {
   var user = {
       id: uuidGenerator()
   };
   res.status(201).send(user);
}