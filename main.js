const express = require('express');   
const bodyParser = require('body-parser');  //for converting json data object type
const mongoose = require('mongoose'); //mongoDB ORM
const app = express();
const path = require('path'); //for creating absolute path
const SearchString = require('./models/searchString')  // importing the model searchString.
const port = process.env.port|3636;
mongoose.connect('mongodb://vinayak:vinayak123@ds044787.mlab.com:44787/wisestep').then(()=>{ //connecting to mongoDB
    console.log('Succesfully connected!');
}).catch((err)=>{
    console.log(err);
});

app.use(bodyParser.json());  //This a middleware for converting json to object type.

app.get('/',(req,res)=>{  // Handling Home page get request
    
     //console.log(req) 
    res.sendFile(path.join(__dirname,'views/mainPage.html')); // (response)sending the homePage to user
});

app.post('/search',(req,res)=>{  // Whenever user enters the value in textbox then its value is sent to our server
    //with the help of angularJs in real time and here that post request is handled. set of keywords that are matching will be sended as response.

   // console.log(req.body.keyword);// for debugging

    if(req.body.keyword)    //checing if the user emptied or entered values in the textbox,  if entered then we  send keywords.
    {
        SearchString.find({keyword:{$regex: new RegExp(req.body.keyword)}}).limit(5).then((data)=>{ //performing find operation to get the top 5 results that are matched with the value enetered by user.
       // console.log("+++",data); //for debugging
        res.json(JSON.stringify(data));  //sending the keyword result as json data.

    }).catch((err)=>{
        console.log("something went wrong!!",err); //handling the error
    })
  }
   else{        // if user emptied then we dont sen any keywords.

        res.end(""); // sending empty response
  }
});

app.post('/submit',(req,res)=>{ //if user types 'locations' and presses 'enter' then a post request is sent with 'locations data' and that request is handled here.
        SearchString.find({keyword:req.body.keyword}).then((data)=>{
        //console.log(data);// for debugging
        if(!data.length)
        {
        var searchString = new SearchString({keyword:req.body.keyword});
        searchString.save().then(()=>{
        console.log("saved succesfully"); //checking on console if the data is saved successfully.
        }).catch((err)=>{
        console.log(err);
        })
     }
        else{
         console.log("already there!"); //no need to save the data if it is already present.
        }
        }).catch((err)=>{
        console.log(err); //consoling the error if any.
        }
        )
})


app.listen(port,()=>{
    console.log(`App listening on port: ${port}`); // binding to the port
})
