const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./models/users');

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/WT_Project')
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

app.post('/users/add', async (req, res) => {
    const data = new users(req.body);
    await data.save();
    res.send(data);
})

app.get('/users', async (req, res) => {
    const data = await users.find();
    res.json(data);
})

app.get('/users/:id', async (req, res) => {
    const data = await users.findById(req.params.id);
    res.json(data);
});

app.delete('/users/:id', async (req, res) => {
    const data = await users.findByIdAndDelete(req.params.id);
    res.json(data);
});

app.put('/users/:id', async (req, res) => {
    const data = await users.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(data);
});

app.listen(3000, () => console.log('Server is running on 3000'));