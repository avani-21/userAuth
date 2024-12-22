const express=require('express');
const app=express();
const hbs=require('hbs');
const path=require('path')
const session=require('express-session');
const nocache=require('nocache');


const userRouter=require('./routers/user')
const adminRouter=require('./routers/admin');
const connectDB = require('./db/connectdb');


app.set('view engine','hbs')
app.set(express.static('public'))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use(nocache())
app.use(session({
  secret:'seccretkey',
  resave:false,
  saveUninitialized:true,
  
}))


app.use('/user',userRouter);
app.use('/admin',adminRouter);


connectDB()

app.listen(3001,()=>{
  console.log('server started')
})