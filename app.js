const express = require('express')
const app = express()
const port = 3000
const charactersRouter = require('./routers/characters.js')
const teamsRouter = require('./routers/teams.js')

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/characters', charactersRouter)

app.use('/teams', teamsRouter)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})