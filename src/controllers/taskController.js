const TaskService = require('./../services/taskService')
const Service = new TaskService()

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Service.getAllTasks()
        res.json(tasks)
    } catch (err) {
        next(err)
    }
}

const getTheTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const tasks = await Service.getOneTask(id)
        res.json(tasks)
    } catch (err) {
        next(err)
    }
}

const produceTask = async (req, res, next) => {
    try {
        const task = req.body
        const response = await Service.createTask(task)
        res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

const changeTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = req.body
        const response = await Service.updateTask(id, task)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

const removeTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await Service.deleteTask(id)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getTasks,
    getTheTask,
    produceTask,
    changeTask,
    removeTask
}