 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');
 
 const port = process.env.PORT || 3000;
 var app = express();

 hbs.registerPartials(__dirname+'/views/partials');
 //to configure view engine for express ... hbs
 app.set('view engine', 'hbs');

 //another middleware for express
 app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err)=>{
        if(err){
            console.log('Unable to save to server.log file');
        }
    });
    next();
})

app.use((req,res,next)=>{
    res.render('maintainance.hbs');
})
//middleware for express
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

//request handler
 app.get('/', (req, res)=>{
    //res.send('<h1>hello express !</h1>');
    res.render('home.hbs',{
        pageTitle : 'home page',
        welcomeMessage: 'Welcome To the homepage of my website',
        
    })
 });

 app.get('/about', (req,res)=>{
     res.render('about.hbs',{
         pageTitle : 'about page',
     });
 })

 app.get('/bad',(req,res)=>{
     res.send({
         errorMessage: 'an Error Occurred'
     })
 })

 app.listen(port, ()=>{
     console.log(`Server is up on port ${port}`);
 }); 