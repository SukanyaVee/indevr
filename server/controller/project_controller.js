module.exports = {
    getUserProj: (req, res) => {
        const db = req.app.get('db')
        // console.log(req.query)
        db.get_projects([req.query.user_id]).then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    getPublicProj: (req, res) => {
        const db = req.app.get('db')
        console.log('get all public project for user', req.query.user_id)
        db.get_public_projects([req.query.user_id]).then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    getMessages: (req, res) => {
        const db = req.app.get('db')
        console.log('get messages for user', req.query.user_id)
        db.get_messages([req.query.user_id]).then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    createMessage: (req, res) => {
        const db = req.app.get('db')
        console.log('create add request message+', req.body)
        db.create_message([req.body.project_id, req.body.user_id, req.body.contributor_id]).then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    deleteMessage: (req, res) => {
        const db = req.app.get('db')
        console.log('delete message ', req.params)
        db.delete_message([req.params.id]).then(posts=> res.status(200).send(posts)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    getSingle: (req, res) => {
        const db = req.app.get('db')
        // console.log(req.params.id)
        db.get_single_project([req.params.id]).then(proj=> res.status(200).send(proj)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    getSkillStack: (req, res) => {
        const db = req.app.get('db')
        // console.log(req.params.id)
        db.get_skillstack([req.params.id]).then(skillstack=> res.status(200).send(skillstack)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    createSkill: (req, res, next) => {
        const db = req.app.get('db') 
        console.log(req.body)
        db.create_skill([req.body.project_id, req.body.skill, req.body.level]).then(()=> res.status(200).send()).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    getProjCons: (req, res) => {
        const db = req.app.get('db')
        console.log(req.query.projectId)
        db.get_project_contributors([req.query.projectId]).then(projCons=> res.status(200).send(projCons)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    createProj: (req, res, next) => {
        const db = req.app.get('db') 
        console.log('create project', req.body)
        db.create_project([req.body.user_id, req.body.project_name, req.body.description, req.body.pub, req.body.repo]).then((resp)=> res.status(200).send(resp)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    addContr: (req, res, next) => {
        const db = req.app.get('db') 
        console.log('add contributor', req.body)
        db.add_contributor([req.body.project_id, req.body.user_id, req.body.owner]).then((resp)=> res.status(200).send()).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    removeContr: (req, res, next) => {
        const db = req.app.get('db') 
        console.log('add contributor', req.params)
        db.remove_contributor([req.params.id]).then((resp)=> res.status(200).send()).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    updateProj: (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        db.update_project([req.body.id, req.body.project_name, req.body.description,req.body.repo]).then(proj=> res.status(200).send(proj)).catch(error=>{console.error(error);res.status(500).send(err)})
    },
    deleteProj: (req, res) => {
        const db = req.app.get('db')
        console.log(req.params.id)
        db.delete_project([req.params.id]).then(()=> res.status(200).send()).catch(error=>{console.error(error);res.status(500).send(err)})
    },
}
