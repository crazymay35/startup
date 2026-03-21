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
      res.status(401).send({msg:'incorrect email or password'});
    }
  }
  else {
    return res.status(404).send({msg:"user not found"});
  }
});

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

apiRouter.delete('/auth/logout', async (req,res) => {
  const token = req.cookies[authCookieName];

  if (token) {
    await DB.updateUserByToken(token, {$set: {token: null}});
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
})

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
  const user = req.user;

  await DB.updateUser(user.email, {$push: {palettes: palette}});
  res.status(201).send(user.palettes);
});

apiRouter.delete('/palettes', async (req, res) => {
  const{index} = req.body;
  const user = req.user;

  if (index < 0 || index >= user.palettes.length) {
    return res.status(400).send({msg:"invalid index"});
  }
  user.palettes.splice(index,1);
  await DB.updateUser(user.email, {$set: {palettes: user.palettes}});
  res.send(user.palettes);
});

//friends endpoints
apiRouter.post('/friends', async (req,res) => {
  const {friendEmail} = req.body;
  const user = req.user;

  const friendExists = await DB.getUser(friendEmail);

  if (!friendExists) {
    return res.status(404).send({msg: "friend not found"});
  }
  if (user.email === friendEmail) {
    return res.status(400).send({msg:"cannot follow yourself"});
  }
  await DB.updateUser(user.email, {$addToSet: {following: friendEmail}});
  const updatedUser = await DB.getUser(user.email);
  res.send(updatedUser.following);
});

apiRouter.delete('/friends', async (req, res) => {
  const {friendEmail} = req.body;
  const user = req.user;
  
  await DB.updateUser(user.email, {$pull: {following: friendEmail}});
  const updatedUser = await DB.getUser(user.email);
  res.send(updatedUser.following);
});

apiRouter.post('/share', async (req, res) => {
  const {palette} = req.body;
  const fromEmail = req.user.email;

  if (!palette) {
    return res.status(400).send({msg: "palette required"});
  }
  await DB.addNotificationToFollowers(fromEmail, palette)
  res.send({msg:'shared palette'});
});

apiRouter.post('/notifications/clear', async (req,res) => {
  const {index} = req.body;
  const user = req.user;
  if (index < 0 || index >= user.notifications.length) {
    return res.status(400).send({msg:"invalid notification"});
  }
  user.notifications.splice(index,1);
  await DB.updateUser(user.email, {$set: {notifications: user.notifications}});
  res.send(user.notifications);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
