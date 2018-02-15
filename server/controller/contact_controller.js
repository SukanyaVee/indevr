module.exports = {
    add: (req, res, next) => {
        const db = req.app.get('db')
        db.add_contact().then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    get: (req, res, next) => {
        const db = req.app.get('db')
        db.get_contacts([req.query.user_id]).then(contacts=> res.status(200).send(contacts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },

}
