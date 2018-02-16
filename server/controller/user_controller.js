module.exports = {
    get: (req,res,next) => {
        const {userID} = req.params;
        const db = req.app.get('db');
        db.get_user([userID]).then(users => {
            //Get Skills for user
            db.get_skills([userID]).then(skills => {
                users[0].skills = skills
                res.status(200).send(users[0]);
            })
        }).catch( err => {
            console.log(err);
            res.status(500).send('Oops, something went wrong!')
        })
    },

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
