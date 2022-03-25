var express = require('express');
var router = express.Router();
var request = require('sync-request')
var movieModel = require('../models/movies')



router.get('/new-movies', function (req, res, next) {
  var data = request("GET", "https://api.themoviedb.org/3/discover/movie?api_key=369c0e1d24aece5713e2ab2251a2d626&language=Fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
  var dataParse = JSON.parse(data.body)

  res.json({ movies: dataParse.results })
});

router.post('/wishlist-movie', async function (req, res, next) {

  var newMovie = new movieModel({
    movieName: req.body.name,
    movieImg: req.body.img
  })

  var movieSave = await newMovie.save()

  var result = false
  if (movieSave.movieName) {
    result = true
  }

  res.json({ result })
});

router.delete('/wishlist-movie/:name', async function (req, res, next) {

  var returnDb = await movieModel.deleteOne({ movieName: req.params.name })

  var result = false
  if (returnDb.deletedCount == 1) {
    result = true
  }

  res.json({ result })
});

router.get('/wishlist-movie', async function (req, res, next) {

  var movies = await movieModel.find()

  res.json({ movies })
});

module.exports = router;
