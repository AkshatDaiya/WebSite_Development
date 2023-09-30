const express = require('express');
const app = express();
const userRouter= require('./Routers/userRouter');
const adminRouter= require('./Routers/adminRouter');
const session = require('express-session');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
app.use(express.urlencoded({extended:false}))


app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:({maxAge:1000*60*60*24*365})
}))
app.use(userRouter)
app.use('/admin',adminRouter)
app.use(express.static('Public'))
app.set('view engine', 'ejs')
app.listen(process.env.PORT, () => { console.log(`Server is running on Port ${process.env.PORT}`) })