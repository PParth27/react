var TodoServerActions = require('../actions/TodoServerActions');
var request = require('superagent');

module.exports = {
  getRandomTodo: function() {
    request.get('http://localhost:11111/hello-world/getRandomTodo')
           .set('Accept', 'application/json')
           .end((err, response) => {
              if (err)
                return console.error(err);
              TodoServerActions.receiveRandom(response.body.content);
           });
  }
};
