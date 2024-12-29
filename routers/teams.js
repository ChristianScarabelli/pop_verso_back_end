const express = require('express')
const router = express.Router()
const teamsController = require('../controllers/teams.js')

// index
router.get('/', teamsController.index)

// show
router.get('/:id', teamsController.show)


module.exports = router