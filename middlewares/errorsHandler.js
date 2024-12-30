// funzione per gestire gli errori delle rotte, non gestiti prima da altri middleware o controlli, o errori imprevisti
const errorsHandler = (err, res) => {       // non inserisco il next perchè vogli oche la funzione fermi il codice in caso di errore

    res.status(500)
    res.json({
        message: err.message
    })
    console.log(err)
}

module.exports = errorsHandler