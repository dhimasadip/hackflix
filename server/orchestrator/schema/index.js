
const { gql } = require('apollo-server')

const typeDefs = gql`
  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Tv {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type AllItems {
    movies: [Movie]
    tvs: [Tv]
  }

  type deleteResult {
    n: String
    ok: String
  }

  type Query {
    getMovies: [Movie]
    getTv: [Tv]
    movie(_id: String): Movie
    tv(_id: String): Tv
    entertainme: AllItems
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  input MovieEdit {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  input TvInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  type Mutation {
    addMovie(movie: MovieInput ) : Movie
    editMovie(edit: MovieEdit ) : deleteResult
    addTv(tv: TvInput ) : Tv
    deleteMovie(_id: String) : deleteResult
    deleteTv(_id: String) : deleteResult
  }
`

module.exports = typeDefs
