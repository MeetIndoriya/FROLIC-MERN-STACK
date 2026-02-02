const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventwisewinners = require('./models/winners');

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/WT_Project')
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

app.post('/eventwisewinners/add', async (req, res) => {
    const data = new eventwisewinners(req.body);
    await data.save();
    res.send(data);
})

app.get('/eventwisewinners', async (req, res) => {
    const data = await eventwisewinners.find();
    res.json(data);
})

app.get('/eventwisewinners/:id', async (req, res) => {
    const data = await eventwisewinners.findById(req.params.id);
    res.json(data);
});

app.delete('/eventwisewinners/:id', async (req, res) => {
    const data = await eventwisewinners.findByIdAndDelete(req.params.id);
    res.json(data);
});

app.put('/eventwisewinners/:id', async (req, res) => {
    const data = await eventwisewinners.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(data);
});

app.listen(3000, () => console.log('Server is running on 3000'));