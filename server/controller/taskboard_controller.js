module.exports = {
    get(req,res) {
        const {projectID} = req.params;
        const db = req.app.get('db');

        //Get users for project and set up return array
        db.get_project_users([projectID]).then(users => {
            let lists = [{user_id: 0, list_name: 'Unassigned', tasks: []}];
            users.forEach(user => {
                lists.push({user_id: user.id, list_name: `${user.first_name} ${user.last_name}`, tasks: []})
            })
            //Get List items
            db.get_project_taskboard([projectID]).then(tasks => {
                let taskboard = {lists, tasks}
                res.status(200).send(taskboard);
            }).catch(err => {
                console.log('Error getting tasks: ', err);
                res.status(500).send('Oops, something went wrong!');
            })
        }).catch(err => {
            console.log('Error getting project users:', err);
            res.status(500).send('Oops, something went wrong!');
        })
    },

    updateCard(req,res) {
        let {id, title, description, status} = req.body.card;
        user_id = req.body.user_id ? req.body.user_id : null;
        const db = req.app.get('db');
        db.update_taskboard([title, description, status, user_id, id]).then( (card) => {
            res.status(200).send('Card Updated');
        }).catch(err => {
            console.log('Error updating task:', err);
            res.status(500).send('Oops, something went wrong!');
        })
    },

    newCard(req,res) {
        let {user_id, title, description, status} = req.body.card;
        let {project_id} = req.body;
        user_id = user_id ? user_id : null;
        const db = req.app.get('db');
        db.add_card_to_taskboard([project_id, user_id, title, description, status]).then( (card) => {
            res.status(200).send(card[0]);
        }).catch(err => {
            console.log('Error updating task:', err);
            res.status(500).send('Oops, something went wrong!');
        })
    },

    deleteCard(req,res) {
        let {cardID} = req.params;
        const db = req.app.get('db');
        db.delete_card_from_taskboard([cardID]).then( () => {
            res.status(200).send('Card deleted');
        }).catch(err => {
            console.log('Error updating task:', err);
            res.status(500).send('Oops, something went wrong!');
        })
    },

}
