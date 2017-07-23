const Twitter = require('twitter')

/** 
 * the authobj should look like
  
  {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: '' 
  }

  **/

function getAllFriends (authObj) {
  return new Promise((resolve, reject) => {
    const client = new Twitter(authObj)
    const friendsArr = []

    const callAndCallAgain = (nextCursor) => {
      const url = 'friends/list'
      const params = {
        count: 200,
        cursor: nextCursor,
        include_user_entities: false
      }

      client.get(url, params).then((response) => {
        friendsArr.push(...response.users)
        if (response.next_cursor === 0) {
          resolve(friendsArr)
        } else {
          callAndCallAgain(response.next_cursor)
        }
      }).catch(err => reject(err))
    }

    callAndCallAgain(-1)
  })
}

module.exports = function (authObj) {
  getAllFriends(authObj).then(friends => friends.map(friend => (
    {
      id: friend.id,
      name: friend.name,
      screen_name: friend.screen_name,
      lastStatusCreated: friend.status && friend.status.created_at ? new Date(friend.status.created_at) : new Date(0)
    }
  )))
    .then((friends) => {
      const aYearAgo = new Date().setFullYear((new Date().getFullYear() - 1))
      return friends.filter(friend => friend.lastStatusCreated < aYearAgo)
    })

    .then(filteredFriends => {
      if (filteredFriends.length === 0) console.log('None of your followers matches your time criteria.')
      else {
        console.log('Based on you time criteria, you should consider unfollow these accounts:\n')
        filteredFriends.forEach(friend => {
          console.log(`${friend.screen_name}; has not posted since ${friend.lastStatusCreated}`)
        })
      }
    })
    .catch(err => console.error(err))
}
