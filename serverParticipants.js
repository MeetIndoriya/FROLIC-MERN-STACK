const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const participants = require('./models/participants');

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/WT_Project')
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

app.post('/participants/add', async (req, res) => {
    const data = new participants(req.body);
    await data.save();
    res.send(data);
})

app.get('/participants', async (req, res) => {
    const data = await participants.find();
    res.json(data);
})

app.get('/participants/:id', async (req, res) => {
    const data = await participants.findById(req.params.id);
    res.json(data);
});

app.delete('/participants/:id', async (req, res) => {
    const data = await participants.findByIdAndDelete(req.params.id);
    res.json(data);
});

app.put('/participants/:id', async (req, res) => {
    const data = await participants.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(data);
});

app.listen(3000, () => console.log('Server is running on 3000'));