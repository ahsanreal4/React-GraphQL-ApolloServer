const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema/type-defs')
const { resolvers } = require('./schema/resolvers')

// Setup Server
const server = new ApolloServer({ typeDefs, resolvers })

// Run Server
server
  .listen()
  .then(({ url }) =>
    console.log(`\x1b\n[33mSERVER IS RUNNING AT ${url} \x1b[0m\n`)
  )
