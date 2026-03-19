const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = {};
let tokens = {};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
app.use(express.static('public'));


//login.jsx Endpoints
apiRouter.post('/auth/create', async (req, res) => {
  const {email, username, password } = req.body;
  if (users[email]) {
    return res.status(409).send({msg:'user already exists'});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users[email] = {
    email, username, password: hashedPassword, palettes:[], following:[], notifications:[], token:null
  };
  res.status(200).send({ msg: 'Success' });
});
apiRouter.post('/auth/login', async (req, res) => {
  const {email, password} = req.body;
  const user = users[email];

  if (!user) {
    return res.status(404).send({msg: "user not found"});
  };
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const authToken = uuid.v4();
    user.token = authToken;
    tokens[authToken] = email;

    res.cookie(authCookieName, authToken, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    }) 
    res.send({email: user.email});
    return;
  }
  else {
    res.status(401).send({msg:'Unauthorized'});
  }
});
const verifyAuth = (req, res, next) => {
  const token = req.cookies[authCookieName];
  const email = tokens[token];
  const user = users[email];
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
  //apiRouter.post('/palettes', verifyAuth, (req,res) => {})
};
apiRouter.use(verifyAuth);
apiRouter.delete('/auth/logout', async(req,res) => {
  const token = req.cookies[authCookieName];
  if (token) {
    delete tokens[token];
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
})
//following.jsx and palletes.jsx Endpoints
apiRouter.get('/user/:email', (req,res) => {
  const user = users[req.params.email];
  if (user) {
    res.send({
      email: user.email,
      username: user.username,
      palettes: user.palettes,
      following: user.following,
      notifications: user.notifications
    });
  }
  else {
    res.status(404).send({msg:'user not found'});
  }
});

//palettes endpoints
apiRouter.post('/palettes', (req,res) => {
  const {palette} = req.body;
  if (!palette) {
    return res.status(400).send({msg: "palette required"});
  }
  const user = req.user;

  user.palettes.push(palette);
  res.status(201).send(user.palettes);
});
apiRouter.delete('/palettes', (req, res) => {
  const{index} = req.body;
  const user = req.user;

  if (index < 0 || index >= user.palettes.length) {
    return res.status(400).send({msg:"invalid index"});
  }
  user.palettes.splice(index,1);
  res.send(user.palettes);
});

//friends endpoints
apiRouter.post('/friends', (req,res) => {
  const {friendEmail} = req.body;
  const user = req.user;

  if (!users[friendEmail]) {
    return res.status(404).send({msg: "friend not found"});
  }
  if (user.email === friendEmail) {
    return res.status(400).send({msg:"cannot follow yourself"});
  }
  if (!user.following.includes(friendEmail)) {
    user.following.push(friendEmail);
  }
  res.send(user.following);
});
apiRouter.delete('/friends', (req, res) => {
  const {friendEmail} = req.body;
  const user = req.user;
  user.following = user.following.filter(f => f !== friendEmail);
  res.send(user.following);
});
apiRouter.post('/share', (req, res) => {
  const {palette} = req.body;
  const fromEmail = req.user.email;
  for (const user of Object.values(users)) {
    if (user.following.includes(fromEmail)) {
      user.notifications.push({from: fromEmail, palette});
    }
  }
  res.send({msg:'shared palette'});
});
apiRouter.post('/notifications/clear', (req,res) => {
  const {notificationsIndex} = req.body;
  const user = req.user;
  if (notificationsIndex < 0 || notificationsIndex >= user.notifications.length) {
    return res.status(400).send({msg:"invalid notification"});
  }
  user.notifications.splice(notificationsIndex,1);
  res.send(user.notifications);
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
