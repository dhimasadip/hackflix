const Movie = require("../models/Movie");

class MovieController {
  static list(req, res, next) {
    Movie.find()
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }

  static findMovie(req, res, next) {
    const { id } = req.params;

    Movie.findById(id)
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }

  static insert(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;

    const arrTags = tags.split(",").map((el) => el.trim());

    const newMovie = {
      title,
      overview,
      poster_path,
      popularity: +popularity,
      tags: arrTags,
    };

    Movie.create(newMovie)
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }

  static destroy(req, res, next) {
    const { id } = req.params;

    Movie.delete(id)
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }

  static edit(req,res,next) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    const arrTags = tags.split(",").map((el) => el.trim());

    const updateMovie = {
      title,
      overview,
      poster_path,
      popularity: +popularity,
      tags: arrTags,
    };

    Movie.update(updateMovie, id)
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }
}

module.exports = MovieController;
