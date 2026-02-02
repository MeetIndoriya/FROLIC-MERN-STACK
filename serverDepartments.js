const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const departments = require('./models/departments');

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/WT_Project')
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

app.post('/departments/add', async (req, res) => {
    const data = new departments(req.body);
    await data.save();
    res.send(data);
})

app.get('/departments', async (req, res) => {
    const data = await departments.find();
    res.json(data);
})

app.get('/departments/:id', async (req, res) => {
    const data = await departments.findById(req.params.id);
    res.json(data);
});

app.delete('/departments/:id', async (req, res) => {
    const data = await departments.findByIdAndDelete(req.params.id);
    res.json(data);
});

app.put('/departments/:id', async (req, res) => {
    const data = await departments.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(data);
});

app.listen(3000, () => console.log('Server is running on 3000'));