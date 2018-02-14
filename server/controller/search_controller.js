module.exports = {
    getUsers: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_users(term).then(response => {
            console.log('user', response)
            res.send(response)
        })
    },
    getProjects: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_projects(term).then(response => {
            console.log('proj', response)
            res.send(response)
        })
    }, 
}