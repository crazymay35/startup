const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

app.use(express.json());

let users = {};

function getUser(email, res) {
  const user = users[email];
  if(!user) {
    res.status(404).send({msg: "user not found"});
    return null;
  }
  return user;
}
//login.jsx Endpoints

app.post('/api/auth/create', (req, res) => {
  const {email, username, password } = req.body;
  const user = getUser(email, res);
  if (user) {
    return res.status(409).send({msg:'user already exists'});
  }
  users[email] = {
    email, username, password, palettes:[], following:[], notifications: []
  };
  res.status(201).send({msg:'user created'})
  /*if (users[email]) {
    return res.status(409).send({msg:'user already exists'})
  }
  users[email] = {
    email, username, password, palettes:[], following:[], notifications: []
  };
  res.status(201).send({msg:'user created'});*/
});

app.post('/api/auth/login', (req, res) => {
  const {email, password} = req.body;
  const user = getUser(email, res);

  if (!user) return;
  if (user.password === password) {
    res.send({email: user.email, username: user.username});
  }
  else {
    res.status(401).send({msg:'incorrect password'});
  }
  /*if (user && user.password === password) {
    res.send({email: user.email, username: user.username});
  }
  else {
    res.status(401).send({msg:'incorrect password'});
  }*/
});

//palletes.jsx Endpoints
app.get('/api/user/:email', (req,res) => {
  const user = users[req.params.email];
  if (user) {
    const {password, ...userSafeData} = user;
    res.send(userSafeData);
  }
  else {
    res.status(404).send({msg:'user not found'});
  }
});

app.post('/api/palettes', (req,res) => {
  const {email, palette} = req.body;

  const user = getUser(email, res);
  if (!user) return;

  user.palettes.push(palette);
  res.status(201).send(user.palettes);
});

app.delete('/api/palettes', (req, res) => {
  const{email, index} = req.body;
  const user = getUser(email, res);

  if (!user) return;
  user.palettes.splice(index,1);
  res.send(user.palettes);
  /*if (users[email]) {
    users[email].palettes.splice(index,1);
    res.send(users[email].palettes);
  }
  else {
    res.status(404).send({msg:'user not found'});
  }*/
});

//following.jsx Endpoints
app.post('/api/friends', (req,res) => {
  const {currentUsersEmail, friendEmail} = req.body;
  const user = getUser(currentUsersEmail, res);
  if (!user) return;
  if (users[friendEmail]) {
    if (!user.following.includes(friendEmail)) {
      user.following.push(friendEmail);
    }
    res.send(user.following);
  }
  /*const user = users[currentUsersEmail];
  if (user && users[friendEmail]) {
    if (!user.following.includes(friendEmail)) {
      user.following.push(friendEmail);
    }
    res.send(user.following);
  }
  else {
    res.status(404).send({msg:'user not found'});
  }*/
});

app.delete('/api/friends', (req, res) => {
  const {currentUsersEmail, friendEmail} = req.body;
  const user = getUser(currentUsersEmail, res);
  if (!user) return;
  if (users[friendEmail]) {
    if (user.following.includes(friendEmail)) {
      user.following = user.following.filter(f => f !== friendEmail);
    }
    res.send(user.following);
  }

  /*if (users && users[friendEmail]) {
    if (user.following.includes(friendEmail)) {
      user.following = user.following.filter(f => f !== friendEmail);
    }
    res.send(user.following);
  }
  else {
    res.status(404).send({msg: 'user not found'});
  }*/
});

app.post('/api/share', (req, res) => {
  const {fromEmail, palette} = req.body;
  Object.keys(users).forEach((email) => {
    if (users[email].following.includes(fromEmail)) {
      users[email].notifications.push({from: fromEmail, palette});
    }
  });
  res.send({msg:'shared palette'});
});

app.post('/api/notifications/clear', (req,res) => {
  const {email,notificationsIndex} = req.body;
  const user = getUser(email, res);
  if (!user) return;
  user.palettes.splice(notificationsIndex,1);
  res.send(user.palettes);
  /*if (users[email]) {
    users[email].notifications.splice(notificationsIndex, 1);
    res.send(users[email].notifications);
  }
  else {
    res.status(404).send({msg: 'user not found'});
  }*/
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
