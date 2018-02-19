//Imports
require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    massive = require('massive'),
    multer =  require('multer'),
    AWS = require('aws-sdk'),
    socket = require('socket.io');
    user = require('./controller/user_controller');
    posts = require('./controller/post_controller');
    contact = require('./controller/contact_controller');
    proj = require('./controller/project_controller');
    auth_ctrl = require('./controller/auth0_controller');
    taskboard_ctrl = require('./controller/taskboard_controller');
    news_feed_ctrl = require('./controller/news_feed_controller');
    search = require('./controller/search_controller');

//App Setup
const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } //24 hours
}));
app.use(express.static(`${__dirname}/../build`));


// AWS declare
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION
});
const s3 = new AWS.S3();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 52428800
  }
})

// AWS Upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    var uniqueIdentifier = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        uniqueIdentifier += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    s3.putObject({
        Bucket: process.env.BUCKET,
        Key: uniqueIdentifier + req.file.originalname,
        Body: req.file.buffer,
        ContentType: "image/png",
        ACL: 'public-read'
    }, (err) => {
      console.log(err);
        if (err) return res.status(400).send(err);
        res.send(`https://s3-${process.env.REGION}.amazonaws.com/${process.env.BUCKET}/${uniqueIdentifier}${req.file.originalname}`);
    })
})


//Massive
massive(process.env.CONNECTION_STRING)
.then(db => app.set('db', db))
.catch(err => console.error(err));



//API Endpoints

// ---------------USER-------------------
const userAPIurl = '/indevr/users'

app.get(`${userAPIurl}/:userID`, user.get) //defined to get users + skills
app.put(`${userAPIurl}/:id`, user.update);
// app.delete(`${userAPIurl}/:id`, user.delete);

// ---------------CONTACTS-------------------
const contactAPIurl = '/indevr/contacts';

// app.post(`${contactAPIurl}/create`, contact.add);
// app.put(`${contactAPIurl}/:id`, contact.update);
// app.delete(`${contactAPIurl}/logout`, contact.unfriend);
app.get(`${contactAPIurl}/connect`, contact.get);
app.post(`${contactAPIurl}/connect`, contact.connect); //Connects users
app.get(`${contactAPIurl}`, contact.get);
app.get(`${contactAPIurl}/check`, contact.check); //Check for existing connection
//
//

//-------------PUBLIC POST FEED--------------
const postAPIurl = '/indevr/posts'
app.get(postAPIurl, posts.get)
app.get(`${postAPIurl}/:userID`, news_feed_ctrl.getProfileFeed)
app.post(postAPIurl, posts.create)
// app.put(postAPIurl, posts.update)
app.delete(`${postAPIurl}/:id`, posts.delete) //uses params to delete record

//-----------------PROJECTS------------------
const projAPIurl = '/indevr/projects';

app.get(projAPIurl, proj.getUserProj); //uses query to fetch user's projects
app.get(`/indevr/public`, proj.getPublicProj); //uses query to fetch public cprojects that don't belong to user
app.get(`${projAPIurl}/:id`, proj.getSingle); //uses params
app.post(projAPIurl, proj.create); //uses body
app.put(projAPIurl, proj.updateProj); //uses body
// app.delete(projAPIurl, proj.delete);

//----------PROJECT DERIVATIVES--------
const skillsAPIurl = '/indevr/skills'

app.get(`${skillsAPIurl}/:id`, proj.getSkillStack); //uses params
app.post(skillsAPIurl, proj.createSkill); // uses body
// app.put(skillsAPIurl, skills.put);
// app.delete(skillsAPIurl, skills.delete);

const projContributors = '/indevr/contributors'

app.get(projContributors, proj.getProjCons); //uses query?
app.post(projContributors, proj.addContr) //uses body
app.delete(`${projContributors}/:id`, proj.removeContr) //uses body

//-------------PROJECT TASKBOARD-----------
const taskboardAPIurl = '/indevr/taskboard';

app.get(`${taskboardAPIurl}/:projectID`, taskboard_ctrl.get);
app.put(taskboardAPIurl, taskboard_ctrl.put);




//-------------------Search------------------
app.get('/search/:term', search.getUsers);
app.get('/search/projects/:term', search.getProjects);
app.get('/search/posts/:term', search.getPosts);


// //----------------AUTH0----------------
// const userUrl = '/'
// //Auth0
// app.post(`${userUrl}/login`, (req, res) => {
//     const {userId} = req.body;
//     const auth0Url = `https://${process.env.REACT_APP_AUTH0_domain}/api/v2/users/${userId}`;
//     axios.get(auth0Url)
// })

// app.get("/checkSession", auth_ctrl.sessionCheck);



//Shhh Listen...
const port = process.env.SERVER_PORT;
const server = app.listen(port, () => console.log(`Up and running on port ${port}`));

//Socket.io chat Setup
const io = socket(server);
io.on('connection', (socket) => {
    console.log(socket.id);
});
io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});
