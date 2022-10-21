const express = require('express');
const connectToMongo = require('./db');
const path = require('path');

const app = express();
connectToMongo();
const port = process.env.PORT || 6000;






app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.use('/api/student', require('./routes/student'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/attend', require('./routes/attend'));
app.use('/api/login', require('./routes/login'));

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.listen(port,() => {
    console.log("Listening port " + port);
})
