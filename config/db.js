const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('✅ MongoDB connected');
    }catch(err){
        console.error('❌ MOngoDB connectioin failed:',err.message);
        process.exit(1);//exit the app
    }
};

connectDB();
