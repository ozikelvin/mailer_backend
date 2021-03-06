const express = require('express');
const app = express();
const router = require('./route/route')
const { doMongo } = require('./config/db')
const cors = require('cors');

require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
const port = process.env.PORT || 3000;

/// Connect to mongo
doMongo();

app.get('/', (req, res)=>{
    res.json({Message: 'Api is working fine'})
})

app.use(router)
app.use((req, res, next) => {
    res.status(404).json({
        Message: "No such endpoint"
    })
})
app.listen(port, ()=>{
    console.log(`SERVER IS LISTENING TO PORT ${port}`)
})
