const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const institutes = require('./models/institutes');

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/WT_Project')
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

app.post('/institutes/add', async (req, res) => {
    const data = new institutes(req.body);
    await data.save();
    res.send(data);
})

app.get('/institutes', async (req, res) => {
    const data = await institutes.find();
    res.json(data);
})

app.get('/institutes/:id', async (req, res) => {
    const data = await institutes.findById(req.params.id);
    res.json(data);
});

app.delete('/institutes/:id', async (req, res) => {
    const data = await institutes.findByIdAndDelete(req.params.id);
    res.json(data);
});

app.put('/institutes/:id', async (req, res) => {
    const data = await institutes.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(data);
});

app.listen(3000, () => console.log('Server is running on 3000'));