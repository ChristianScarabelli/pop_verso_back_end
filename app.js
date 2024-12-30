// INIT
const express = require('express')
const app = express()
const port = 3000

// MIDDLEWARES
const cors = require('cors')
const errorsHandler = require('./middlewares/errorsHandler.js')
const notFound = require('./middlewares/notFound.js')
const trimStrings = require('./middlewares/trimStrings.js')

// ROUTERS
const charactersRouter = require('./routers/characters.js')
const teamsRouter = require('./routers/teams.js')


// USO I MIDDLEWARES
app.use(cors())
// permetto di accettare file json nella body request
app.use(express.json())
app.use(trimStrings)

app.get('/', (req, res) => {
    res.send('rotta principale del mio server')
})

app.use('/characters', charactersRouter)

app.use('/teams', teamsRouter)

// middleware di errori non gestiti
app.use(errorsHandler)
// middleware risorsa non trovata
app.use(notFound)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})