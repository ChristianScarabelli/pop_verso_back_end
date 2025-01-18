// richiamo la connessione al database
const connection = require('../data/db.js')

// funzione rotta Index => visualizzare tutti gli elementi
function index(req, res) {
    console.log('elenco dei personaggi')

    // creo la query
    let sql = `SELECT * FROM characters`

    // concateno per filtrare risultati con search bar
    if (req.query.search) {
        sql += ` WHERE name LIKE '%${req.query.search}%'`
    }

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

// funzione rotta store => inserire un nuovo elemento 
function store(req, res) {

    console.log("Payload ricevuto dal client:", req.body)

    // recupero l'id del path
    const id = req.params

    // recupero i dati dalla req
    const { name, age, shadow, description } = req.body

    console.log(req.body)

    // // validazione
    // let errors = []

    // if (!name || typeof name !== 'string' || name.trim().length > 255 || name.trim().length === 0) {
    //     errors.push('Name is required')
    // }

    // if (!age || typeof age !== 'number' || age < 0) {
    //     errors.push('Age is required and must be a number')
    // }

    // if (!shadow || typeof shadow !== 'number') {
    //     errors.push('Shadow is required')
    // }

    // if (!description || typeof description !== 'string' || description.trim().length === 0) {
    //     errors.push('Description is required')
    // }

    // // se ci sono errori invio la risposta e termino l'esecuzuone 
    // if (errors) {
    //     console.log("Errori di validazione:", errors)
    //     res.status(400).json({ errors })
    //     return

    // query
    const sql = `INSERT INTO characters (name, age, shadow, description) VALUES ( ?, ?, ?, ?)`

    connection.query(sql, [name, age, shadow, description], (err, result) => {
        if (err) return res.status(500).json({ error: 'databse query failed' })
        console.log("Personaggio aggiunto, ID:", result.insertId)
        res.status(201).json({ message: 'Added to database' })
    })
}


module.exports = { index, show, store }