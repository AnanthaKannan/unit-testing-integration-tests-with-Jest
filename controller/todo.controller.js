const TodoModel = require('../model/todo.model');

exports.createTodo = async(req, res, next) => {
    try{
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
    }
    catch(err){
        next(err)
    }
}

exports.getTodo = async(req, res, next) => {
    try{
        const allToDo = await TodoModel.find({});
        res.status(200).json(allToDo);
    }
    catch(err){
        next(err)
    }
}

exports.getTodoById = async(req, res, next) => {
    try{
        const todoModel = await TodoModel.findById(req.params.todoId);
        if(todoModel){
        res.status(200).json(todoModel);
        }
        else{
            res.status(404).send();
        }
    }
    catch(err){
        next(err)
    }
}