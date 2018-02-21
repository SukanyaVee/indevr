module.exports = {

    getMessages(req,res) {
        const {room} = req.query;
        const db = req.app.get('db');
        db.get_project_chat_messages([room]).then( messages => {
            res.status(200).send(messages);
        }).catch(err => {
            console.log('Error getting messages:', err);
            res.status(500).send('Oops, something went wrong!');
        })
    },

    addMessage(req,res) {
        let {username, message, room} = req.body;
        const db = req.app.get('db');
        db.add_project_chat_message([username, message, room]).then( () => {
            res.status(200).send();
        }).catch(err => {
            console.log('Error saving message:', err);
            res.status(500).send('Oops, something went wrong!');
        })
    },

}
