module.exports = {
    getUserProj: (req, res) => {
        const db = req.app.get('db')
        db.get_projects([req.query.user_id]).then(posts=> {
            res.status(200).send(posts)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    getPublicProj: (req, res) => {
        const db = req.app.get('db')
        db.get_public_projects([req.query.user_id]).then(posts=> {
            res.status(200).send(posts)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    getMessages: (req, res) => {
        const db = req.app.get('db')
        db.get_messages([req.query.user_id]).then(posts=> {
            res.status(200).send(posts)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    createMessage: (req, res) => {
        const db = req.app.get('db')
        db.create_message([req.body.project_id, req.body.user_id, req.body.contributor_id]).then(posts=> {
            res.status(200).send(posts)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    deleteMessage: (req, res) => {
        const db = req.app.get('db')
        db.delete_message([req.params.id]).then(posts=>{
            res.status(200).send(posts)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    getSingle: (req, res) => {
        const db = req.app.get('db')
        db.get_single_project([req.params.id]).then(proj=>{
            res.status(200).send(proj)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    getSkillStack: (req, res) => {
        const db = req.app.get('db')
        db.get_skillstack([req.params.id]).then(skillstack=>{
            res.status(200).send(skillstack)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    createSkill: (req, res, next) => {
        const db = req.app.get('db')
        db.create_skill([req.body.project_id, req.body.skill, req.body.level]).then(skills=>{
            res.status(200).send(skills[0])
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    getProjCons: (req, res) => {
        const db = req.app.get('db')
        db.get_project_contributors([req.query.projectId]).then(projCons=>{
            res.status(200).send(projCons)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    createProj: (req, res, next) => {
        const db = req.app.get('db')
        db.create_project([req.body.user_id, req.body.project_name, req.body.description, req.body.pub, req.body.repo]).then((resp)=>{
            res.status(200).send(resp)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    addContr: (req, res, next) => {
        const db = req.app.get('db')
        db.add_contributor([req.body.project_id, req.body.user_id, req.body.owner]).then((resp)=> {
            res.status(200).send()
        }).catch(error=>{
            console.error(error);
            res.status(500).send(error)
        })
    },
    removeContr: (req, res, next) => {
        const db = req.app.get('db')
        db.remove_contributor([req.params.id]).then((resp)=>{
            res.status(200).send()
        }).catch(error=>{
            console.error(error);
            res.status(500).send(err)
        })
    },
    updateProj: (req, res) => {
        const db = req.app.get('db')
        db.update_project([req.body.id, req.body.project_name, req.body.description,req.body.repo]).then(proj=>{
            res.status(200).send(proj)
        }).catch(error=>{
            console.error(error);
            res.status(500).send(err)
        })
    },
    deleteProj: (req, res) => {
        const db = req.app.get('db')
        db.delete_project([req.params.id]).then(()=>{
            res.status(200).send()
        }).catch(error=>{
            console.error(error);
            res.status(500).send(err)
        })
    },

    deleteSkill: (req, res) => {
        const db = req.app.get('db');
        db.delete_project_skill([req.params.id]).then( () => {
            res.status(200).send();
        }).catch(error=>{
            console.error(error);
            res.status(500).send(err)
        })
    }
}
