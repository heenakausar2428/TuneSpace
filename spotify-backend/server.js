import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRouter.js';
import albumRouter from './src/routes/albumRouter.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';


// app config
const app= express();
const port= process.env.PORT || 4000;
connectDB();
connectCloudinary();


//middleware
app.use(express.json());
//if we get any method, that request will be passed through the json method.
app.use(cors());
//allows frontend to connect with the backend.




//initializing routes

app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);


app.get('/', (req,res)=> res.send("API working"));
app.listen(port, ()=>console.log(`server started on ${port}`));




