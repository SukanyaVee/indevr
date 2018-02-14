module.exports = {
    getInfo: (req, res) => {
        const { term } = req.params;
        req.app.get('db').search_users(term).then(response => {
            // console.log('res', response)
            res.send(response)
        })
    }
}