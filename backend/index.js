const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const Movie = require('./models/movie');

const app = express();

const PORT = process.env.PORT || 5000;
const DB = process.env.DB_HOST;

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connection Open!!!')
    })
    .catch(err => {
        console.log(`Mongo Error: ${err}`)
    })

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../frontend/public/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

app.get('/home', async (req, res) => {
    const videos = await Movie.find();
    // console.log(videos);
    res.send(videos);
})

app.get('/home/:id', async (req, res) => {
    const {id} = req.params;
    const video = await Movie.findOne({_id: id})

    res.send(video);
})

app.post('/upload', upload.fields([{name: 'thumbnailImage'},{name: 'video'}]), (req, res) => {
    console.log(req.files);

    const newMovie = new Movie({
        name: req.body.name,
        year: req.body.year,
        language: req.body.language,
        thumbnail: req.files.thumbnailImage[0].filename,
        video: req.files.video[0].filename
    })

    console.log(newMovie);

    newMovie.save()
        .then(() => res.json('New Movie Uploaded'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})

app.listen(PORT, () => {
    console.log('Listening on port : ', PORT);
})