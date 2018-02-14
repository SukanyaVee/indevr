module.exports = {
    getProfileFeed(req,res) {
        const {userID} = req.params;
        const db = req.app.get('db');

        db.get_profile_news_feed([userID]).then(posts => {
            console.log(posts);
            res.status(200).send(posts)
        }).catch(err => {
            console.log('Error getting user posts:', err);
            res.status(500).send('Oops, something went wrong!');
        })
    },


}
