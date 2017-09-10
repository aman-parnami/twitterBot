var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//created_at,id,text,user name, user description, re-tweet count
var tweetSchema = new Schema({
    createdAt:{
        type:Date
    },
    id:{
        type:Number,
        unique:true
    },
    text:{
        type:String,
        unique:true
    },
    username:{
        type:String
    },
    userdescription:{
        type:Object
    },
    retweetCount:{
        type:Number
    }
    

});

//var Tweets = mongoose.model('tweet',tweetSchema);
//module.export =Tweets;
module.exports = mongoose.model('tweet',tweetSchema);
