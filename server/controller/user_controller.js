module.exports = {
    
    update: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(req.body)
            dbInstance.edit_user([req.params.id,req.body.firstName,req.body.lastName,req.body.email,req.body.pic]).then(user=> {                
                res.status(200).json(user)
            }).catch(error=>{console.error(error);res.status(500).send(error)})
    },
    delete: (req, res, next) => {
        console.log('connect country')
        const dbInstance = req.app.get('db') 
        dbInstance.delete_user([req.params.id]).then(entry=> {res.status(200).send(entry)}).catch(error=>{console.error(error);res.status(500).send(err)})
    }
    
}