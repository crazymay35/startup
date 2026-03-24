const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

//login Endpoints
apiRouter.post('/auth/create', async (req, res) => {
  const {email, username, password } = req.body;
  if (await DB.getUser(email)) {
    return res.status(409).send({msg:'user already exists'});
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {email, username, password: hashedPassword, palettes:[], following:[], notifications:[], token:null};
  await DB.createUser(newUser);
  res.status(200).send({ msg: 'account created! please login' });
});

apiRouter.post('/auth/login', async (req, res) => {
  const {email, password} = req.body;
  const user = await DB.getUser(email);

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const authToken = uuid.v4();
      await DB.updateUser(email, {$set: {token: authToken}});

      setAuthCookie(res, authToken);
      res.send({email: user.email, username: user.username});
      return;
    }
    else {
      res.status(401).send({msg:'incorrect email or password'});
    }
  }
  else {
    return res.status(404).send({msg:"user not found"});
  }
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });
}

apiRouter.delete('/auth/logout', async (req,res) => {
  const token = req.cookies[authCookieName];

  if (token) {
    await DB.updateUserByToken(token, {$set: {token: null}});
  }
  res.clearCookie(authCookieName, {
    path: '/',
    sameSite: 'strict',
    secure: true,
  });
  res.status(204).end();
})

const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = await DB.getUserByToken(token);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'unauthorized' });
  }
};

apiRouter.use(verifyAuth);

apiRouter.get('/user/me', (req, res) => {
  res.send({ 
    email: req.user.email, 
    username: req.user.username 
  });
});

//get user data to edit it directly
apiRouter.get('/user/name/:email', async (req,res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    res.send({username: user.username});
  }
  else {
    res.status(404).send({msg: 'user not found'});
  }
})
apiRouter.get('/user/:email', async (req,res) => {
  if (req.user.email !== req.params.email) {
    return res.status(403).send({msg: 'forbidden'});
  }
  const user = await DB.getUser(req.params.email);
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
apiRouter.post('/palettes', async (req,res) => {
  const {palette} = req.body;
  if (!palette) {
    return res.status(400).send({msg: "palette required"});
  }
  await DB.updateUser(req.user.email, {$push: {palettes: palette}});
  const updatedUser = await DB.getUser(req.user.email);
  res.status(201).send({palettes: updatedUser.palettes});
});

apiRouter.delete('/palettes', async (req, res) => {
  const{index} = req.body;

  if (index < 0 || index >= req.user.palettes.length) {
    return res.status(400).send({msg:"invalid index"});
  }
  req.user.palettes.splice(index,1);
  await DB.updateUser(req.user.email, {$set: {palettes: req.user.palettes}});
  const updatedUser = await DB.getUser(req.user.email);
  res.status(201).send({palettes: updatedUser.palettes});
});

//friends endpoints
apiRouter.post('/friends', async (req,res) => {
  const {friendEmail} = req.body;

  const friendExists = await DB.getUser(friendEmail);

  if (!friendExists) {
    return res.status(404).send({msg: "user not found"});
  }
  if (req.user.email === friendEmail) {
    return res.status(400).send({msg:"cannot follow yourself"});
  }
  await DB.updateUser(req.user.email, {$addToSet: {following: friendEmail}});
  const updatedUser = await DB.getUser(req.user.email);
  res.send(updatedUser.following);
});

apiRouter.delete('/friends', async (req, res) => {
  const {friendEmail} = req.body;
  
  await DB.updateUser(req.user.email, {$pull: {following: friendEmail}});
  const updatedUser = await DB.getUser(req.user.email);
  res.send(updatedUser.following);
});

apiRouter.post('/share', async (req, res) => {
  const {palette} = req.body;

  if (!palette) {
    return res.status(400).send({msg: "palette required"});
  }
  await DB.addNotificationToFollowers(req.user.email, palette)
  res.send({msg:'shared palette'});
});

apiRouter.delete('/notifications/clear', async (req,res) => {
  const {index} = req.body;
  if (index < 0 || index >= req.user.notifications.length) {
    return res.status(400).send({msg:"invalid notification"});
  }
  req.user.notifications.splice(index,1);
  await DB.updateUser(req.user.email, {$set: {notifications: req.user.notifications}});
  const updateUser = await DB.getUser(req.user.email);
  res.send(updateUser.notifications);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});