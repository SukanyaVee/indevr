module.exports = {
    getUsers: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_users(term).then(response => {
            res.status(200).send(response)
        })
    },
    getProjects: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_projects(term).then(projects => {
            let proj = [];
            let skills = []
            projects.forEach(project => {
                proj.push({project_id: project.id, project_name: project.project_name, description: project.description, public: project.public, skills: []})
            })
                req.app.get('db').search_stacks().then(stacks => {
                    skills.push(stacks)
                    let projectSearch = {proj, skills}
                res.send(projectSearch)
        })
    }).catch(err => console.log('Err', err))
},
    getPosts: (req,res) => {
        const { term } = req.params;
        req.app.get('db').search_posts(term).then(response => {
            res.send(response)
        })
    },
    getSkills: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_skills(term).then(response => {
            res.send(response)
        })
    }
}