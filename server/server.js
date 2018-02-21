//Imports
require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    massive = require('massive'),
    multer =  require('multer'),
    AWS = require('aws-sdk'),
    socket = require('socket.io'),
    user = require('./controller/user_controller'),
    posts = require('./controller/post_controller'),
    contact = require('./controller/contact_controller'),
    proj = require('./controller/project_controller'),
    auth_ctrl = require('./controller/auth0_controller'),
    taskboard_ctrl = require('./controller/taskboard_controller'),
    news_feed_ctrl = require('./controller/news_feed_controller'),
    search = require('./controller/search_controller'),
    nodemailer = require('nodemailer');

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


//Nodemailer Setup 

app.post('/indevr/send', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: process.env.USER_EMAIL,
        subject: `New Message from inDevr member, ${req.body.name}`,
        text: `${req.body.name}, ${req.body.email}`,
        html: `<h3>From:</h3>${req.body.name}<br/><h3>Email:</h3>${req.body.address}<br/><h3>Comments:</h3>${req.body.email}`
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err)
            res.status(500).send('Uh-Oh, Something went wrong!');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Message Sent!')
        }
    })
})


//API Endpoints

// ---------------USER-------------------
const userAPIurl = '/indevr/users'

app.get(`${userAPIurl}/:userID`, user.get) //defined to get users + skills
app.put(`${userAPIurl}/:id`, user.update);
app.post(`${userAPIurl}/skills`, user.addSkill);
app.delete(`${userAPIurl}/skills/:id`, user.deleteSkill);
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
app.post(projAPIurl, proj.createProj); //uses body
app.put(projAPIurl, proj.updateProj); //uses body
app.delete(`${projAPIurl}/:id`, proj.deleteProj);

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

const projMessages = '/indevr/messages'

app.get(projMessages, proj.getMessages); //uses query
app.delete(`${projMessages}/:id`, proj.deleteMessage) // uses params

//-------------PROJECT TASKBOARD-----------
const taskboardAPIurl = '/indevr/taskboard';

app.get(`${taskboardAPIurl}/:projectID`, taskboard_ctrl.get);
app.put(taskboardAPIurl, taskboard_ctrl.updateCard);
app.post(taskboardAPIurl, taskboard_ctrl.newCard);




//-------------------Search------------------
app.get('/search/:term', search.getUsers);
app.get('/search/projects/:term', search.getProjects);
app.get('/search/posts/:term', search.getPosts);
app.get('/search/skills/:term', search.getSkills);


// //----------------AUTH0----------------
app.post('/login', auth_ctrl.user);

function checkLoggedIn(req, res, next) {
    if(!req.session.user){
        req.session.user = {
            user: null
        }
    }
    next();
};
app.get("/checkSession", checkLoggedIn, auth_ctrl.sessionCheck);
app.post('/logout', auth_ctrl.logout);


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

//Socket.io Whiteboard Setup
function onConnection(socket){
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);
