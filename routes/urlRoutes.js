const express=require('express');
const router=express.Router();
const {nanoid}=require('nanoid');
const Url=require('../models/Url');
const PORT = process.env.PORT || 5000;

//POST /api/shorten
router.post('/shorten',async(req,res)=>{
    const{originalUrl,customAlias}=req.body;

    if(!originalUrl){
        return res.status(400).json({message:'orginal URL is required'});
    }

    try{
        const newUrl=new Url({
            originalUrl,
            shortId,
        });

        await newUrl.save();

        return res.status(201).json({
            message: 'Short URL created',
            shortUrl: `http://localhost:${PORT}/${shortId}`,
        });
    }catch(err){
        return res.status(500).json({message:'Server error',error:err.message});
    }
});

module.export=router;