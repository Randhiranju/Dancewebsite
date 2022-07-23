const express=require('express');
const path=require('path');
const { urlToHttpOptions } = require('url');
const app=express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
//body-parser is a middle ware
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port=8000;
//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    desc:String
});
//mongoose model
var  contact = mongoose.model('contact', contactSchema);
//for serving static files
app.use('/static',express.static('static')) 
 
//middleware used to bring data to express in backend 
app.use(express.urlencoded()); 

//pug related stuff
app.set('view engine','pug') //set the template engine as pug 
app.set('views',path.join(__dirname,'views')) // set view directory

//endpoints
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    });
    // res.status(200).render('contact.pug');
})

//start listening 
app.listen(port,()=>{
    console.log(`The application started sucessfully on port ${port}`)
});