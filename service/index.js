const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

app.use(express.json());

let users = {};

//login.jsx Endpoints
app.post('/api/auth/create', (req, res) => {
  const {email, username, password } = req.body;
  if (users[email]) {
    return res.status(409).send({msg:'user already exists'});
  }
  
  users[email] = {
    email, username, password, palettes:[], following:[], notifications: []
  };
  res.status(201).send({email, username});
});

app.post('/api/auth/login', (req, res) => {
  const {email, password} = req.body;
  const user = users[email];

  if (!user) {
    return res.status(404).send({msg: "user not found"});
  };
  if (user.password === password) {
    res.send({email: user.email, username: user.username});
  }
  else {
    res.status(401).send({msg:'incorrect password'});
  }
});

//following.jsx and palletes.jsx Endpoints
app.get('/api/user/:email', (req,res) => {
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

//palletes.jsx Endpoints
app.post('/api/palettes', (req,res) => {
  const {email, palette} = req.body;
  if (!palette) {
    return res.status(400).send({msg: "palette required"});
  }
  const user = users[email];
  if (!user) return res.status(404).send({msg:"user not found"});

  user.palettes.push(palette);
  res.status(201).send(user.palettes);
});

app.delete('/api/palettes', (req, res) => {
  const{email, index} = req.body;
  const user = users[email];
  if (!user) return res.status(404).send({msg:"user not found"});

  if (!user) return;
  user.palettes.splice(index,1);
  res.send(user.palettes);
});

//following.jsx Endpoints
app.post('/api/friends', (req,res) => {
  const {currentUsersEmail, friendEmail} = req.body;
  const user = users[currentUsersEmail];
  if (!user) return res.status(404).send({msg:"user not found"});

  if (!users[friendEmail]) {
    return res.status(404).send({msg: "friend not found"});
  }
  if (!user.following.includes(friendEmail)) {
    user.following.push(friendEmail);
  }
  res.send(user.following);
});

app.delete('/api/friends', (req, res) => {
  const {currentUsersEmail, friendEmail} = req.body;
  if (!users[currentUsersEmail]) {
    return res.status(404).send({msg: "user not found"});
  }
  if (!users[friendEmail]) {
    return res.status(404).send({msg: "friend not found"});
  };
  if (user.following.includes(friendEmail)) {
    user.following = user.following.filter(f => f !== friendEmail);
  }
  res.send(user.following);
});

app.post('/api/share', (req, res) => {
  const {fromEmail, palette} = req.body;
  for (const user of Object.values(users)) {
    if (user.following.includes(fromEmail)) {
      user.notifications.push({from: fromEmail, palette});
    }
  }
  res.send({msg:'shared palette'});
});

app.post('/api/notifications/clear', (req,res) => {
  const {email,notificationsIndex} = req.body;
  const user = users[email];
  if (!user) return res.status(404).send({msg:"user not found"});

  user.notifications.splice(notificationsIndex,1);
  res.send(user.notifications);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
