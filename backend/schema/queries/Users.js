const { UserList } = require('../../fakeData')

const Users = {
  // User Resolvers
  users: (parent, args) => {
    const pageSize = args.limit
    const offset = args.offset

    // FORMULA
    // LOOP Start = offset * Page Size
    // Loop End = offset * Page Size + (Page Size - 1)

    /*

      TEST 1
      ======
      offset = 0 
      Page Size = 2
      Answer: 0 to 1

      offset = 1
      Page Size = 2
      Answer: 2 to 3

      offset = 2
      Page Size = 2
      Answer: 4 to 5

      TEST 2
      ======
      offset = 0
      Page Size = 3 
      Answer: 0 to 2

      offset = 1
      Page Size = 3 
      Answer: 3 to 5

      offset = 2
      Page Size = 3
      Answer: 6 to 8

    */
    const paginatedArray = []
    for (
      let i = offset * pageSize;
      i <= offset * pageSize + (pageSize - 1);
      i++
    ) {
      if (i > UserList.length - 1) {
        break
      }
      paginatedArray.push(UserList[i])
    }
    return paginatedArray
  },
  user: (parent, args) => {
    const id = args.id
    const user = _.find(UserList, { id: Number(id) })
    return user
  }
}

module.exports = { Users }
