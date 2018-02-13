import axios from 'axios';

module.exports = {
//Login & Register User
get: (req, res) => {
    const {userId} = req.body;
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_domain}/api/v2/users/${userId}`;
    axios.get(auth0Url, {
        headers: {
            Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
        }
    }).then(response => {
        const userData = response.data;
                    //May Need to alter this DB file name
        app.get('db').find_user(userData.user_id).then(users => {
            if(user.length){
                req.session.user = users[0];
                res.status(200).json({user: req.session.user})
            } else {
                            //May Need to alter this DB file name
                app.get('db').create_user([userData.user_id, userData.first_name, userData.last_name, userData.email, userData.picture]).then(user => {
                    req.session.user = user[0];
                    res.status(200).json({user: req.sesson.user})
                })
            }
        }).catch(err => console.log('Something went wrong: ', err))
    }).catch(err => {
        console.log('Something went wrong: ', err);
        res.status(500).json({message: 'Server 500'});
    })
},

// function checkLoggedIn(req, res, next) {
//     if (req.session.user) {
//       next();
//     } else {
//       res.status(403).json({ message: 'Unauthorized' });
//     }
// }

//Check User Session - Associated with App.js 
sessionCheck: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized, please log in to verify access.' });
    }
},

//Destroy user session, facilitate logout
logout: (req, res) => {
    req.session.destroy();
    res.status(200).send('You have been successfully logged out.')
},
}
