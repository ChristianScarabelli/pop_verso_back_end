const express = require('express')
const router = express.Router()
const charactersController = require('../controllers/characters.js')

// index
router.get('/', charactersController.index)

// show
router.get('/:id', charactersController.show)

module.exports = router