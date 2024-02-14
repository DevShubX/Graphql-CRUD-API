var express = require("express")
var {graphqlHTTP} = require("express-graphql");
const cors = require('cors');
const graphqlSchema = require("./schema/graphql/schema");
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const database = mongoose.connection;

database.on('connected',()=>{
    console.log("Database Connected");
});

var app = express();


const corsOptions = {
    origin: '*',
    optionSuccessStatus : 200,    
}

app.use(cors(corsOptions));
app.use(express.json());


// Create a graphql API endpoint
app.use("/graphql", graphqlHTTP({
    schema : graphqlSchema,
    graphiql : true,
}));

// Start the server at port
app.listen(4000);

console.log("Running a GraphQL API server running");


module.exports = app;