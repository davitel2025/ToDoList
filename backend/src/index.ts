import express from 'express';
import dotenv from 'dotenv';
import tasks_router from '../routes/tasks-routes';
import connectToDb from '../database/database';
import cors from 'cors';

dotenv.config();
const app = express();

//Connect to our database
connectToDb();

//middleware
app.use(express.json());

//Connect to React
app.use(cors({
  origin: 'http://localhost:5173'
}));

const PORT = process.env.PORT_ENV

//routes
app.use('/api/tasks', tasks_router);



app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`);
})
