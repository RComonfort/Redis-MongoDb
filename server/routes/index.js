const TodoController = require('./../controllers/todo.controller');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: "Welcome to the API."
    }));

    app.get('/api/todos', TodoController.list);
    app.post('/api/todos', TodoController.create);
}