//require() is basically import in node
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('RetroFit API running');
}

);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
