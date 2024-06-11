require('dotenv').config()
const express = require ('express')
const app = express()
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const adminRoutes = require('./routes/admin')
const connectDB = require('./db')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())

//handling CORS
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}
));


//routes
app.use('/api',authRoutes)
app.use('/api',postRoutes)
app.use('/api',adminRoutes)

app.get('/', (req, res)=>{
    res.send('Hello world')
})

app.listen(process.env.PORT, ()=>{
    console.log('App listening on port: ',process.env.PORT)
})

connectDB()