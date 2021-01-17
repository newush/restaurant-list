const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantList = require('./restaurant.json').results
const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  const userPromises = []
  SEED_USERS.forEach((data, index) => {
    userPromises.push(bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(data.password, salt))
      .then(encrypted => User.create({
        name: data.name,
        email: data.email,
        password: encrypted
      }))
      .then(user => {
        const userId = user._id
        const restaurantPromises = []
        for (let i = index * 3; i < index * 3 + 3; i++) {
          restaurantPromises.push(Restaurant.create({ ...restaurantList[i], userId }))
        }
        return Promise.all(restaurantPromises)
      })
      .then(() => {
        console.log('restaurant done')
      }))
  })

  Promise.all(userPromises)
    .then(() => {
      console.log('done')
      process.exit()
    })
})
