
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
}

module.exports = resolvers
