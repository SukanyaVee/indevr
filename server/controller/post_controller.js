module.exports = {
    get: (req, res, next) => {
        const db = req.app.get('db') 
        db.get_posts().then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    create: (req, res, next) => {
        const db = req.app.get('db') 
        console.log(req.body)
        db.create_post([req.body.user_Id,req.body.content]).then((resp)=> {res.status(200).send(resp);console.log(resp)}).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    delete: (req, res, next) => {
        const db = req.app.get('db') 
        console.log(req.params)
        db.delete_post([req.params.id]).then(()=> {
            db.get_posts().then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
        }).catch(error=>{console.error(error);res.status(500).send(err)})
    }
}