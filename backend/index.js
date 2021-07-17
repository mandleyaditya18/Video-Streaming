const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const Movie = require('./models/movie');
const path = require('path');
const {v4: uuidv4} = require('uuid');

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
      callback(null, file.fieldname+"-"+uuidv4()+path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "thumbnailImage") { 
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
      ) { 
        cb(null, true);
      } else {
        cb(null, false); 
      }
    } else if (file.fieldname === "video") {
      if (
        file.mimetype === 'video/mp4'
      ) { 
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});

app.get('/home', async (req, res) => {
  const page = req.query.page
  // const limit = req.query.limit;

  // console.log(page, limit);

  // const page = 10;
  const limit = 6;

  try {
      const posts = await Movie.find()
                      .skip(limit * (page-1))
                      .limit(limit)
                      .then((results) => {
                          return res.status(200).send(results);
                      })
                      .catch((err) => {
                          return res.status(500).send(err);
                      });
  } catch (err) {
      console.error(err.message);
  }
})

app.get('/home/:id', async (req, res) => {
    const {id} = req.params;
    const video = await Movie.findOne({_id: id})

    res.send(video);
})

app.get('/count', async (req, res) => {
  let cnt = 0;

  await Movie.find().count(function(err, count){
    cnt = count;
    // console.log("Number of docs: ", cnt );
  });

  res.json(cnt);
})

app.post('/upload', upload.fields([{name: 'thumbnailImage'},{name: 'video'}]), (req, res) => {
    // console.log(req.files);

    const newMovie = new Movie({
        name: req.body.name,
        year: req.body.year,
        language: req.body.language,
        thumbnail: req.files.thumbnailImage[0].filename,
        video: req.files.video[0].filename
    })

    // console.log(newMovie);

    newMovie.save()
        .then(() => res.json('New Movie Uploaded'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})

app.listen(PORT, () => {
    console.log('Listening on port : ', PORT);
})