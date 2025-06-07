const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware: cors=>backend-frontend connection maker

app.use(cors());
app.use(express.json()); //to parse json data in post request
const urlRoutes=require('./routes/urlRoutes');
app.use('/api',urlRoutes);

//sample route to test
app.get('/',(req,res)=>{
    res.send("Welcome to TinyLink url shortner !");
});

//connect to DB config file
require('./config/db');

//start server
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});