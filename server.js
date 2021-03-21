var express = require('express'); 
var { graphqlHTTP } = require('express-graphql');
var mongoose = require('mongoose');

// const cors = require('cors');

var { makeExecutableSchema } = require('@graphql-tools/schema');
var typeDefs = require('./graphql/typeDefs/');
var resolvers = require('./graphql/resolvers/');

var schema = makeExecutableSchema({
  typeDefs, 
  resolvers: resolvers
});

var app = express(); 
var PORT = 4000;
const MONGODB_URI = "mongodb+srv://dbuser:P%40ssw0rd@cluster1.ebiee.mongodb.net/db01?retryWrites=true&w=majority";   

// app.use(cors());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

app.listen(PORT, function() { 
  console.log(`Server listening on port ${PORT}.`);
});