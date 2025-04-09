const { Router } = require('express')
const router = Router()
const { getTasks, getTheTask, produceTask, changeTask, removeTask } = require('./../controllers/taskController')
const validatorHandler = require('./../middlewares/validation')
const { getTaskSchema, createTaskSchema, updateTaskSchema } = require('../schemas/taskSchema')

router.get('/', getTasks)
router.get('/:id', validatorHandler(getTaskSchema, 'params'), getTheTask)
router.post('/', validatorHandler(createTaskSchema, 'body'), produceTask)
router.patch('/:id', validatorHandler(getTaskSchema, 'params'), validatorHandler(updateTaskSchema, 'body'), changeTask)
router.delete('/:id', validatorHandler(getTaskSchema, 'params'), removeTask)

module.exports = router