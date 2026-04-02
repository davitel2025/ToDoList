import mongoose from "mongoose";
import TaskModel from "../models/Task";

export const getAllTasks = async (req : any, res : any ) => {
    try{
        const allTasks = await TaskModel.find({});  
        if (allTasks.length > 0){
            res.status(200).json({
                success:true,
                message: 'List of tasks fetched with sucess',
                data: allTasks,
            })
        }else{
            res.status(404).json({
                success:false,
                message: `Could not find any task`
            })            
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: `Something went wrong. Please try again.`           
        })
    }
}

export const getSingleTask = async (req : any, res : any) =>{
    try{
        const getCurrentTask = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(getCurrentTask)){
            res.status(400).json({
                success: false,
                message: `Couldn't find any task with this ID. Please try again`
            })
        }
        const getTaskDetails = await TaskModel.findById(getCurrentTask);
        res.status(200).json({
            success: true,
            message: `Task found with success!`,
            data: getTaskDetails,
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: 'An error occured. Please try later',
            error_log: e,
        })
    }
}

export const addNewTask = async (req : any, res : any) =>{
    try{
        const newTaskFormData = req.body;
        const newlyCreatedTask = await TaskModel.create(newTaskFormData);
        if (newlyCreatedTask){
            res.status(201).json({
                success: true,
                message: `Task created with success!`,
                data: newlyCreatedTask
            })
        }else{
            res.status(400).json({
                success: false,
                message: `Couldn't create any task`
           })
        }
    }catch(e){
        res.status(500).json({
            success: false,
            message: 'An error occured. Please try later',
            error_log: e,
        })

    }
}

export const updateTask = async ( req: any, res: any) =>{
    try{
        const updateTaskData = req.body;
        const TaskId = req.params.id;
        const updateTask = await TaskModel.findByIdAndUpdate(TaskId, updateTaskData,
            {
                new: true
            }
        );
        if (updateTask){
            res.status(201).json({
                success: true,
                message: 'Task updated with success!',
                data: updateTask
            })
        }else{
            res.status(400).json({
                success: false,
                message: `Couldn't find the task to update`
            })
        }

    }catch(error){
        res.status(500).json({
            success: false,
            message: `An error occured. Please try again later`,
            error_log: error
        })
    }
}

export const deleteTask = async (req : any, res: any) =>{
    try{
        const TaskId = req.params.id;
        const deleteTaskById = await TaskModel.findByIdAndDelete(TaskId);
        if (deleteTaskById){
            res.status(201).json({
                success: true,
                message: 'Task deleted with success!'
            })
        }else{
            res.status(400).json({
                success: false,
                message: `Couldn't find task by this id`
            })
        }

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'An error occured. Please try latter'
        })
    }
}