import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, `Task's title is required!`],
        trim: true,
        maxLength: [200, `Task's lenght has to be 200 letter max`]
    },
    expiredDate : {
        type: Date,
        required : [true, 'Expired date is required'],
        min : [Date.now, 'Expired date cannot be in the past'],
        max : [new Date('2100-01-01'), 'expired date cannot be in a distant future'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    situation:{
        type: String,
        enum : ['pending', 'working in', 'finished'],
        default: 'pending',
    },
    createdAt : {
        type: Date,
        default: Date.now,
    }
});

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;