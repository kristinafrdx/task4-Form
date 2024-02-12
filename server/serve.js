import express from "express";
import path from 'path';
import cors from 'cors';
import { getUsers, status, createUser, isExistUser, deleteAll, blockAndUnblockUsers, checkLogin, checkBlock } from './database.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.send(users);
  res.end()
})

app.post('/login', async (req, res) => {
  const user = req.body;
  const existUser = await isExistUser(user.login, user.password);
  const blockCh = await checkBlock(user.login, 'blocked');
  if (existUser && blockCh.length < 1) {
    res.json({ message: 'true' });
  } else {
    res.json({message: 'false' });
  }
})

app.post('/registration', async (req, res) => {
  const newUser = req.body;
  const currentLogin = newUser.login;
  const check = await checkLogin(currentLogin);
  if (check.length > 0) {
    res.json({ message: false})
  } else {
    res.json({ message: true})
    await createUser(newUser.name, newUser.login, status.active, newUser.password);
    res.end();
  }
});

app.post('/table/delete', async (req, res) => {
  const users = req.body
  const id = users.map((el) => el.id)
  const update = await deleteAll(id);
  res.send(update);
})

app.post('/table/block', async (req, res) => {
  const users = req.body;
  const idUsers = users.map((el) => Number(el.id));
  const update = await blockAndUnblockUsers('blocked', idUsers);
  res.send(update);
})

app.post('/table/unlock', async (req, res) => {
  const users = req.body;
  const idUsers = users.map((el) => Number(el.id));
  const update = await blockAndUnblockUsers('active', idUsers);
  res.send(update);
})

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:${PORT}`)
})