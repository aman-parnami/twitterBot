var twit = require('twit');
var Agenda = require('agenda');

var tweet = require('./models/tweet');
var config = require('./config');

var agenda = new Agenda({
    db:{address:'mongodb://localhost:27017/twit',collection:'task'}
});
var Twitter = new twit(config);

var params={
    q:'blockchain,bitcoin',
    result_type:'recent',
    lang:'en',
    count:100
}
function storeTweet(data){
    for(var i=0;i<data.statuses.length;i++){
        tweet.create({
            createdAt:data.statuses[i].created_at,
            id:data.statuses[i].id,
            text:data.statuses[i].text,
            username:data.statuses[i].user.name,
            userdescription:data.statuses[i].user,
            retweetCount:data.statuses[i].retweet_count

        });
}
}



    agenda.define('get tweets',function(job,done){
        Twitter.get('search/tweets',params,function(err,data){
            if(err){console.log('something went wrong')};

            storeTweet(data);
        
        });
        done();
    });

module.exports = agenda;
