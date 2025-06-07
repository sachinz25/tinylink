const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware: cors=>backend-frontend connection maker

app.use(cors());
app.use(express.json()); //to parse json data in post request

const urlRoutes = require('./routes/urlRoutes');
app.use('/api/shorten', urlRoutes);

//sample route to test
app.get('/',(req,res)=>{
    res.send("Welcome to TinyLink url shortner !");
});

//connect to DB config file
require('./config/db');

//create redirect route(GET /:shortId)
const Url=require('./models/Url');

app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    try {
        const urlDoc = await Url.findOne({ shortId }); // Corrected method name

        if (urlDoc) {
            return res.redirect(urlDoc.originalUrl);
        } else {
            return res.status(400).send('❌ Short URL not found');
        }
    } catch (err) {
        return res.status(500).send('⚠️ Server Error');
    }
});

//start server
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});