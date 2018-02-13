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
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))

            // db.get_project_taskboard([projectID])
            // .then(tasks => {
            //     res.status(200).send(tasks);
            // })
            // .catch( err => {
            //     console.log('Error getting project lists: ', err);
            //     res.status(500).send('Oops, something went wrong!');
            // });
        },

}
