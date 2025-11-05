
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Market = require('./services/marketClient');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// In-memory users (prototype). For production, replace with DB.
const users = {};

// Signup
app.post('/api/signup', async (req,res)=>{
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({error:'missing'});
  if (users[username]) return res.status(400).send({error:'exists'});
  const hash = await bcrypt.hash(password, 10);
  users[username] = { hash, createdAt: new Date() };
  const token = jwt.sign({ username }, JWT_SECRET);
  res.send({ token });
});

// Login
app.post('/api/login', async (req,res)=>{
  const { username, password } = req.body;
  const u = users[username];
  if (!u) return res.status(400).send({error:'notfound'});
  const ok = await bcrypt.compare(password, u.hash);
  if (!ok) return res.status(401).send({error:'unauth'});
  const token = jwt.sign({ username }, JWT_SECRET);
  res.send({ token });
});

app.get('/api/health', (req,res)=>res.send({ok:true}));

// socket.io for realtime
io.on('connection', socket => {
  console.log('ws conn');
  const tick = async ()=>{
    try {
      const data = await Market.getSnapshot();
      socket.emit('market', data);
    } catch(err){ console.error(err); }
  };
  const id = setInterval(tick, 5000);
  tick();
  socket.on('disconnect', ()=> clearInterval(id));
});

server.listen(PORT, ()=> console.log('Server on', PORT));
