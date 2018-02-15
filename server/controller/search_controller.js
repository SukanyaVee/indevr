module.exports = {
    getUsers: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_users(term).then(response => {
            // console.log('user', response)
            res.send(response)
        })
    },
    getProjects: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_projects(term).then(response => {
            // console.log('proj', response)
            res.send(response)
        })
    },
    getPosts: (req,res) => {
        const { term } = req.params;
        req.app.get('db').search_posts(term).then(response => {
            // console.log('post', response)
            res.send(response)
        })
    },
    // getSkills: (req, res) => {
    //     const { term } = req.params;
    //     req.app.get('db')
    // }, 
    // getStacks: (req, res) => {
    //     const { term } = req.params;
    //     req.app.get('db')
    // },
}