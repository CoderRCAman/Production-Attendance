const express = require('express');
const app = express(); 
const path = require('path') ;
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/AdminRoutes');
const cors = require('cors')
//build mode
const buildPath = path.normalize(path.join(__dirname, './build'));
app.use(express.static(buildPath));

app.get('(/*)?', async (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

mongoose.connect('mongodb+srv://Server:1234@cluster0.0ychj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        console.log('DB Connected') 
    })
    .catch(() => {
        console.log('TOO many errors')
    })
//middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//use routes 
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.listen(PORT, () => {
    console.log('Listenning to PORT ', PORT);
})