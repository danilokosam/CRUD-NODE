const taskModel = require('./../models/taskModel')
const ApiError = require('./../utils/apiError')

class TaskService {
    
    async getAllTasks() {
        const tasks = await taskModel.find()
        return tasks
    }

    async getOneTask(id) {
        const task = await taskModel.findOne({ _id: id })
        if (!task) {
            throw new ApiError('No se encontro la tarea', 404)
        }
        return task
    }

    async createTask(task) {
        const result = await taskModel.create(task)
        return result
    }

    async updateTask(id, body) {
        const task = await taskModel.findOne({ _id: id })
        if (!task) {
            throw new ApiError('No se encontro la tarea', 404)
        }
        const result = await taskModel.updateOne({ _id: id}, body)
        return 'Cambios Hechos'
    }

    async deleteTask(id) {
        const task = await taskModel.findOne({ _id: id })
        if (!task) {
            throw new ApiError('No se encontro la tarea', 404)
        }
        const result = await taskModel.deleteOne({ _id: id })
        return 'Tarea eliminada'
    }

}

module.exports = TaskService