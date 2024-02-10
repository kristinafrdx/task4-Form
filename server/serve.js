import express from "express";
import path from 'path';
import cors from 'cors';
import { getUsers, getUser, deleteUser, status, createUser, isExistUser, deleteAll } from './database.js'

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

// get users from table
app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.send(users);
})

// check within login
app.post('/login', async (req, res) => {
  const user = req.body;
  const existUser = await isExistUser(user.login, user.password)
  console.log(existUser);
  if (existUser) {
    res.json({ message: 'true' })
  } else {
    res.json({message: 'false' })
  }
})

// create new user in table
app.post('/registration', async (req, res) => {
  const newUser = req.body;
  await createUser(newUser.name, newUser.login, status.active, newUser.password)
});

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:${PORT}`)
})