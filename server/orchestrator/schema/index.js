
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

  type Query {
    movies: [Movie]
    tvs: [Tv]
    movie(_id: String): Movie
    tv(_id: String): Tv
    entertainme: AllItems
  }
`

module.exports = typeDefs
