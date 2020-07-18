
const { tvServer, movieServer } = require('../config/axios')

const resolvers = {
  Query: {
    movies: () => {
      return movieServer.get('/')
        .then(({ data }) => data)
        .catch(console.log)
    },
    tvs: () => {
      return tvServer.get('/')
        .then(({ data }) => data)
        .catch(console.log)
    },
    movie: (parent, args) => {
      const { _id } = args

      return movieServer.get(`/${_id}`)
        .then(({ data }) => data)
        .catch(console.log)
    },
    tv: (parent, args) => {
      const { _id } = args

      return tvServer.get(`/${_id}`)
        .then(({ data }) => data)
        .catch(console.log)
    },
    entertainme: () => {
      let datas = {}

      return movieServer.get('/')
        .then(({ data }) => {
          datas.movies = data
          return tvServer.get('/')
        })
        .then(({ data }) => {
          datas.tvs = data
          return datas
        })
        .catch(console.log)
    }
  },
  Mutation: {
    addMovie: (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args.movie

      return movieServer.post('/', { title, overview, poster_path, popularity, tags })
        .then(({ data }) => data.ops[0])
        .catch(console.log)
    },

    addTv: (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args.tv

      return tvServer.post('/', { title, overview, poster_path, popularity, tags })
        .then(({ data }) => data.ops[0])
        .catch(console.log)
    },

    deleteMovie: (_, args) => {
      const { _id } = args

      return movieServer.delete(`/${_id}`)
        .then(({ data }) => data)
        .catch(console.log)
    },

    deleteTv: (_, args) => {
      const { _id } = args

      return tvServer.delete(`/${_id}`)
        .then(({ data }) => data)
        .catch(console.log)
    }
  }
}

module.exports = resolvers
