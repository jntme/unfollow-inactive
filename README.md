# unfollow-inactive
A simple command line tool to unfollow inactive accounts.

## usage

```javascript

const unIn = require('./unfollow-inactive');

//get your keys at https://apps.twitter.com/
const authObj = {
    consumer_key: '<your_consumer_key>',
    consumer_secret: '<your_consumer_secret>0,
    access_token_key: '<your_access_token_key>',
    access_token_secret: '<your_token_secret>' 
}

unIn(authOb);
```