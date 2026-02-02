const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const events = require('./models/events');

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/WT_Project')
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

app.post('/events/add', async (req, res) => {
    const data = new events(req.body);
    await data.save();
    res.send(data);
})

app.get('/events', async (req, res) => {
    const data = await events.find();
    res.json(data);
})

app.get('/events/:id', async (req, res) => {
    const data = await events.findById(req.params.id);
    res.json(data);
});

app.delete('/events/:id', async (req, res) => {
    const data = await events.findByIdAndDelete(req.params.id);
    res.json(data);
});

app.put('/events/:id', async (req, res) => {
    const data = await events.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(data);
});

app.listen(3000, () => console.log('Server is running on 3000'));