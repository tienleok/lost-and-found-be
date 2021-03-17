var express = require('express'); 
var { graphqlHTTP } = require('express-graphql');
var mongoose = require('mongoose');

// const cors = require('cors');

var { makeExecutableSchema } = require('@graphql-tools/schema');
var typeDefs = require('./graphql/typeDefs/');
var resolvers = require('./graphql/resolvers/');
//console.log(resolvers);
console.clear();

var schema = makeExecutableSchema({
  typeDefs, 
  resolvers: resolvers
});

var app = express(); 
var PORT = 4000;
const MONGODB_URI = "mongodb://localhost:27017/my_local_db";   

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