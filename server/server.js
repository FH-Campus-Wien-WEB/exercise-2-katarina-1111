const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  //Task 1.2. Object from movie-model.js to Array
  const allMovies = Object.values(movieModel);
  res.json(allMovies); 
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1.  */
  const id = req.params.imdbID;

  const movie = movieModel[id];

  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */

     app.put('/movies/:imdbID', function (req, res) {
      const id = req.params.imdbID;
      const updateMovie = req.body; 

      if (movieModel[id]) {
        movieModel[id] = updateMovie;
        console.log(`Movie ${id} updated successfully.`);
        res.sendStatus(200);
      } else {
        movieModel[id] = updatedMovie;
        console.log(`New Movie ${id} added successfully.`);
        res.status(201).json(updatedMovie);
      }
     });

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

