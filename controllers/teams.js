// richiamo la connessione al database
const connection = require('../data/db.js')

function index(req, res) {
    console.log('elenco dei teams')

    const sql = `SELECT * FROM teams`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failed' })
        res.json(results)
    })
}

function show(req, res) {

    const id = req.params.id

    console.log(`dettagli team con id ${id}`)

    const teamSql = `SELECT * FROM teams WHERE id = ?`

    connection.query(teamSql, [id], (err, teamResult) => {
        if (err) return res.status(500).json({ error: 'database query failed' })
        if (teamResult.length === 0) return res.status(404).json({ error: 'team not found' })

        const team = teamResult[0]
        res.json(team)
    })
}

module.exports = { index, show }