/*Here schema of searchString is created and created module is exported.*/

const mongoose = require('mongoose');  //mongoDB ORM for nodejs application.

const searchString = new mongoose.Schema({  // schema(design) is created
keyword:
{
    type:String
}
});

searchString.index({keyword:1},{sparse:true}); //Here index of searchString is creted on "keyword" and they are arranged in ascending order,  that is why its value value is 1

const SearchString = mongoose.model('SearchString',searchString); // model is created.

module.exports  =   SearchString; // we are exporting so, that it can be imported in other libraries.