//Imports
require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    massive = require('massive'),
    multer =  require('multer'),
    AWS = require('aws-sdk'),
    auth_ctrl = require('./controller/auth0_controller');


//App Setup
const app = express();
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




const userUrl = '/'
//Auth0 
app.post(`${userUrl}/login`, (req, res) => {
    const {userId} = req.body;
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_domain}/api/v2/users/${userId}`;
    axios.get(auth0Url)
})

app.get("/checkSession", auth_ctrl.sessionCheck);



//Shhh Listen...
const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Up and running on port ${port}`));
