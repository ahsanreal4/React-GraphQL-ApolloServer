const { UserList } = require('../../fakeData')

const Users = {
  // User Resolvers
  users: () => {
    return UserList
  },
  user: (parent, args) => {
    const id = args.id
    const user = _.find(UserList, { id: Number(id) })
    return user
  }
}

module.exports = { Users }
