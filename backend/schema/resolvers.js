const { MovieList, UserList } = require('../fakeData')
const _ = require('lodash')

// Resolvers
const { Movies } = require('./queries/Movies')
const { Users } = require('./queries/Users')

const resolvers = {
  Query: {
    ...Users,
    ...Movies
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input
      const lastId = UserList[UserList.length - 1].id
      user.id = lastId + 1
      UserList.push(user)
      return user
    },
    updateUsername: (parent, args) => {
      const { id, username } = args.input
      let updatedUser
      UserList.forEach((user) => {
        if (user.id.toString() === id) {
          user.username = username
          updatedUser = user
        }
      })
      return updatedUser
    },
    deleteUser: (parent, args) => {
      const id = args.id
      _.remove(UserList, (user) => user.id.toString() === id)
      return null
    }
  },

  User: {
    favoriteMovies: () => {
      return MovieList
    }
  }
}

module.exports = { resolvers }
