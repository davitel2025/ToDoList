import mongoose from 'mongoose';

const connectToDb = async() => {
    try{
        await mongoose.connect('mongodb+srv://daviTeles:daviTeles45@cluster0.r0coszs.mongodb.net/');
        console.log("Connection with mongoDB went succefully!");

    }catch{
        console.log("Connection with mongoDB failed");
        process.exit(1);
    }
}

export default connectToDb;