const express=require('express');
const morgan=require('morgan');
const dotenv=require('dotenv');
dotenv.config();
const PORT=process.env.PORT;
const app=new express();
app.use(morgan('dev'));

// for deployment
const path = require('path'); 

app.use(express.static(path.join(__dirname,'/build'))); 




const userRoute=require('./routes/userRoutes');
const blogRoute=require('./routes/blogRoutes');
const cors=require('cors');





app.use(cors());

app.use('/api',userRoute);

app.use('/api',blogRoute);


const db=require('./db/mongoDb');
// mention starting--index.html
app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname 
    ,'/build/index.html')); }); 



app.listen(PORT,(req,res)=>{

    console.log(`Server is running ${PORT}`);
})