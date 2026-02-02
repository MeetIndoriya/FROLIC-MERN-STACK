const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const groups = require('./models/groups');

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/WT_Project')
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

app.post('/groups/add', async (req, res) => {
    const data = new groups(req.body);
    await data.save();
    res.send(data);
})

app.get('/groups', async (req, res) => {
    const data = await groups.find();
    res.json(data);
})

app.get('/groups/:id', async (req, res) => {
    const data = await groups.findById(req.params.id);
    res.json(data);
});

app.delete('/groups/:id', async (req, res) => {
    const data = await groups.findByIdAndDelete(req.params.id);
    res.json(data);
});

app.put('/groups/:id', async (req, res) => {
    const data = await groups.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(data);
});

app.listen(3000, () => console.log('Server is running on 3000'));