const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const cors = require('cors')

const { makeExecutableSchema } = require('@graphql-tools/schema')
const typeDefs = require('./graphql/typeDefs/')
const resolvers = require('./graphql/resolvers/')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers
})

const app = express()
const PORT = 4000
const MONGODB_URI = 'mongodb+srv://dbuser:P%40ssw0rd@cluster1.ebiee.mongodb.net/db01?retryWrites=true&w=majority'

app.use(cors())

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
mongoose.connection.once('open', function () {
  console.log('Connected to the Database.')
})
mongoose.connection.on('error', function (error) {
  console.log('Mongoose Connection Error : ' + error)
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`)
})
