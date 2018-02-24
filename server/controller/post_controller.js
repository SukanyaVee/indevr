module.exports = {
    get: (req, res, next) => {
        const db = req.app.get('db')
        db.get_posts([]).then(posts=> {
            res.status(200).send(posts)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    create: (req, res, next) => {
        const db = req.app.get('db')
        db.create_post([req.body.user_Id,req.body.content]).then((resp)=>{
            res.status(200).send(resp);
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    delete: (req, res, next) => {
        const db = req.app.get('db')
        db.delete_post([req.params.id]).then(()=> {
            db.get_posts().then(posts=> {
                res.status(200).send(posts)
            }).catch(error=>{
                console.error(error);
                res.status(500).send(error)
            })
        }).catch(error=>{console.error(error);
            res.status(500).send(error)
        })
    }
}
