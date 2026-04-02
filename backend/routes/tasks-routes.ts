import express from "express";

import { getSingleTask, getAllTasks, addNewTask, deleteTask, updateTask} from '../controllers/tasks-controller'

const tasks_router = express.Router();

tasks_router.get('/get/:id', getSingleTask);
tasks_router.get('/get', getAllTasks);
tasks_router.post('/post', addNewTask );    
tasks_router.delete('/delete/:id', deleteTask);
tasks_router.put('/update/:id', updateTask);


export default tasks_router;

