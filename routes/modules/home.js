const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
router.get('/', (req, res) => {
  const keyword = req.query.keyword || ''
  const sort = req.query.sort || 'name'
  const userId = req.user._id

  Restaurant.find(
    { userId })
    .find(
      {
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { category: { $regex: keyword, $options: 'i' } }
        ]
      })
    .lean()
    .sort({ [sort]: 'asc' })
    .then((restaurants) => {
      res.render('index', { restaurants, keyword, sort })
    })
    .catch(error => console.log(error))
})
module.exports = router
