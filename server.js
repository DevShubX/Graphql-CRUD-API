var express = require("express")
var {graphqlHTTP} = require("express-graphql");
const cors = require('cors');
const graphqlSchema = require("./schema/graphql/schema");
const connectDB = require("./config/db");
require('dotenv').config();


var app = express();


connectDB();

app.use(cors());

// Create a graphql API endpoint
app.use("/graphql", graphqlHTTP({
    schema : graphqlSchema,
    graphiql : true,
}));

// Start the server at port
app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql")