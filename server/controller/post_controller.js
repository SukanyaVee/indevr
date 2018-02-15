module.exports = {
    get: (req, res, next) => {
        const db = req.app.get('db') 
        db.get_posts().then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    create: (req, res, next) => {
        const db = req.app.get('db') 
        db.create_post([req.body.user_id,req.body.content]).then(()=> res.status(200).send()).catch(error=>{console.error(error);res.status(500).send(err)})
        db.get_posts().then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
}