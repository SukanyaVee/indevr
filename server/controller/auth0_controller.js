const axios = require("axios");
require("dotenv").config();

module.exports = {
  //Login & Register User
user: (req, res) => {
    console.log('login started')
    const { userId } = req.body;
    console.log('userID', userId);
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
    axios.get(auth0Url, {
        headers: {
          Authorization: "Bearer " + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
        }
    }).then(response => {
        console.log('first resp:', response.data)
        const userData = response.data;
        //May Need to alter this DB file name
        req.app.get("db").find_user(userData.user_id).then(users => {
            console.log('sec resp', users)
            if (users.length) {
                req.session.user = users[0];
                let {id, picture} = req.session.user;
                console.log({ user: {id, picture} })
                res.status(200).json({ user: {id, picture} });
            } else {
                req.app.get("db").create_user([
                    userData.user_id,
                    userData.first_name,
                    userData.last_name,
                    userData.email,
                    userData.picture
                ]).then(user => {
                    req.session.user = user[0];
                    res.status(200).json(req.sesson.user);
                });
            }
          }).catch(err => console.log("Something went wrong 1: ", err));
    }).catch(err => {
        console.log("Something went wrong 2: ", err);
        res.status(500).json({ message: "Server 500" });
    });
},

  //Check User Session - Associated with App.js
  sessionCheck: (req, res) => {
      console.log(req.session);
    res.status(200).send(req.session)
  },

  //Destroy user session, facilitate logout
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send("You have been successfully logged out.");
  },
};
