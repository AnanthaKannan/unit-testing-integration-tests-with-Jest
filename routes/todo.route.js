const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo.controller');

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodo);
router.get('/:todoId', todoController.getTodoById);
router.delete('/:todoId', todoController.deleteTodoById);
router.put('/:todoId', todoController.updateTodo);

module.exports = router;