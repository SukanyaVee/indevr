module.exports = {
    getUsers: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_users(term).then(response => {
            res.status(200).send(response)
        }).catch(err => console.log(err))
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
        }).catch(err => console.log('Error getting search stacks:', err))
    }).catch(err => console.log('Err', err))
},
    getPosts: (req,res) => {
        const { term } = req.params;
        req.app.get('db').search_posts(term).then(post => {
        //    post.map((elem, i) => {
        //         let id = elem.user_id
        //         req.app.get('db').search_postsID(id).then(response => {
        //             elem.first_name = response[0].first_name;
        //             elem.last_name = response[0].last_name;
        //             elem.picture = response[0].picture;
        //             return elem;
        //         })
            res.send(post)
            }).catch(err => console.log(err))

    },
    getSkills: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_skills(term).then(response => {
            res.send(response)
        }).catch(err => console.log('Error searching skills:', err))
    }
}
