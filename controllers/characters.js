// richiamo la connessione al database
const connection = require('../data/db.js')

// funzione rotta Index => visualizzare tutti gli elementi
function index(req, res) {
    console.log('elenco dei personaggi')

    // creo la query
    const sql = `SELECT * FROM characters`

    // uso la query con connection(connessione al db), con la funzione query(), 
    // che accetta la query creata e una callback per gestire risposta ed errore, ed eventuale parametro dinamico (come l'id)
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'databse query failed' })  // return || else if
        res.json(results)  // rispondo con un json che contiene l'elenco intero
    })
}

// funzione rotta show => visualizzare un elemento 
function show(req, res) {

    // recupero l'id dalla request
    const id = req.params.id

    // creo la query con parametro non definito, per evitare injection
    const characterSql = `SELECT * FROM characters WHERE id = ?`

    // uso la query per i dettagli del personaggio tramite id
    connection.query(characterSql, [id], (err, characterResult) => {
        if (err) return res.status(500).json({ error: 'databse query failed' })
        if (characterResult.length === 0) return res.status(404).json({ error: 'character non found' })

        // salvo il post trovato per id in una variabile,
        // che corrisponde al primo elemento dell'array, quindi all'elemento con indice 0
        const character = characterResult[0]

        // ritorno il json con il personaggio
        res.json(character)
    })
}

module.exports = { index, show }