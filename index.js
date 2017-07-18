const Twitter = require('twitter');
require('./mykeys');

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

const url = 'friends/list';
const params = {
  count: 5,
  include_user_entities: false,
};

client.get(url, params)
  .then((friends) => {
    const friendsArr = friends.users;
    const lastStateArr = [];

    friendsArr.forEach((friend) => {
      const friendState = {
        friendName: friend.name,
      };

      let lastState;
      if (!friend.status) lastState = 0;
      else {
        lastState = friend.status.created_at;
      }

      friendState.lastState = lastState;
      lastStateArr.push(friendState);
    });

    console.log(lastStateArr);
  })
  .catch(err => console.error(err));
