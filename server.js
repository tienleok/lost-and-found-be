const { useSofa, OpenAPI } = require('sofa-api')
const express = require('express')
const helmet = require('helmet')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const { SecretsManagerClient, GetSecretValueCommand  } = require("@aws-sdk/client-secrets-manager");


const cors = require('cors')

const { makeExecutableSchema } = require('@graphql-tools/schema')
const typeDefs = require('./graphql/typeDefs/')
const resolvers = require('./graphql/resolvers/')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers
})

const app = express()
const PORT = 8082
const client = new SecretsManagerClient({region: "ap-southeast-1"});
const command = new GetSecretValueCommand({SecretId: "MONGODB_URI"});
const response = await client.send(command);
const MONGODB_URI = response.SecretString;

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }))
app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', parameterLimit: 10000000, extended: true }))

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
mongoose.connection.once('open', function () {
  console.log('Connected to the Database.')
})
mongoose.connection.on('error', function (error) {
  console.log('Mongoose Connection Error : ' + error)
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  // rootValue: resolvers,
  graphiql: true
}))

const openApi = OpenAPI({
  schema,
  info: {
    title: 'Lost-and-Found API',
    version: '1.0.0'
  }
})

app.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
    onRoute (info) {
      openApi.addRoute(info, {
        basePath: '/api'
      })
    }
  })
)

// writes every recorder route
openApi.save('./swagger.json')

const swaggerDocument = require('./swagger.json')

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)

app.use('/health', function (req, res, next) {
  res.sendStatus(200)
})

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`)
})
