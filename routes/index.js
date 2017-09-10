var express = require('express');
var router = express.Router();
var twit = require('twit');
var tweet = require('../models/tweet');
var config = require('../config');
var Twitter = new twit(config);


router.get('/tweetsbyuser',function(req,res){
  
    tweet.aggregate([
        {
            $group: {
                _id: { user: "$userdescription"  },
                count: { $sum: 1 }
            }
        }
    ], function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});



router.get('/retweet',function(req,res){
    tweet.find({},{},{sort:'-retweetCount'},function(err,result){
        if(err) {throw err;}
        res.json(result);
    });
});

module.exports = router;