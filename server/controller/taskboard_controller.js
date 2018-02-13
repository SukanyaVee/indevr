module.exports = {
    get(req,res) {
        const {projectID} = req.params;
        const db = req.app.get('db');

        //Get users for project and set up return array
        db.get_project_users([projectID]).then(users => {
            let lists = [{list_name: 'Unassigned', tasks: []}];
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

    put(req,res) {
        let {id, title, description, status, due, user_id} = req.body;
        due = due ? due : null;
        const db = req.app.get('db');
        db.update_taskboard([title, description, status, due, user_id, id]).then( () => {
            res.status(200).send('Task updated');
        }).catch(err => {
            console.log('Error updating task:', err);
            res.status(500).send('Oops, something went wrong!');
        })
    },

}
