const mongoose = require('mongoose');
const dbHOST = process.env.DBHOST;

mongoose.connect(dbHOST)
    .then(() => {
        console.log('MongoDB Connnected')
    }).catch((err) => {
        console.log('MongoDB connection Error:', err);
    })