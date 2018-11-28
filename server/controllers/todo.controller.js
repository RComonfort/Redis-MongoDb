const Todo = require('./../models/todo.model');
// Redis
const redis = require('redis');
var rclient = redis.createClient();

module.exports = {
    list(req, res) {
        const title = 'todos';
        return rclient.get(title, (err, reply) => {
            if(err) return res.status(400).message(err);
            else {
                if(reply) {
                    console.log("redis");
                    return res.status(300).send(reply);
                }
                else {
                    return Todo.find({}, (error, todos) => {
                        if (err) return res.status(400).send(error);
                        
                        console.log("Mongo");
                        return rclient.set(title, JSON.stringify(todos), () => {
                            return res.status(200).send(todos);
                        })  
                    })
                }
            } 
        });
    },

    create(req, res) {
        if(!req.body.task) return res.status(400).send({
            message: "Task field not found"
        });

        return Todo.create(req.body, (err, todo) => {
            if(err) return response.status(400).send({
                message: "Failed to save todo."
            });

            res.status(200).send(todo);
        });
    }
}