const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getyear',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('caps',(Text)=>{
    return Text.toUpperCase()
});
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method}${req.url}`;
    console.log(log);
    fs.appendFile('serever.log',log + '\n');
    next();
    
});

//app.use((req,res,next)=>{
//    res.render('maintainence.hbs',{
//        pagetitle:'Under Maintainence',
//        message:'Please come back late'
//    });
//});
    
app.use(express.static(__dirname +'/public'));

app.get('/',(req,res)=> {
    
//    res.send('<h1>hey welcome</h1>');
    
    res.render('welcome.hbs',{
        pagetitle:'Home Page',
        message:'Welcome'
    });
    
});

app.get('/about',(req,res)=>{
    
    res.render('about.hbs',{
        pagetitle:'About page',
        message:'Howdy Patner'
   
    });

});

app.get('/bad',(req,res)=>{
    res.send({errormsg:'error occured'});
})
        
app.listen(3000);