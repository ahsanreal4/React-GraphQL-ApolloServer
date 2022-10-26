const { MovieList } = require('../fakeData')
const { UserMutations } = require('../schema/mutations/UserMutations')

// Resolvers
const { Movies } = require('./queries/Movies')
const { Users } = require('./queries/Users')

const resolvers = {
  Query: {
    ...Users,
    ...Movies
  },

  Mutation: {
    ...UserMutations
  },

  User: {
    favoriteMovies: () => {
      return MovieList
    }
  }
}

module.exports = { resolvers }
