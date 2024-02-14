const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull} = require("graphql");

const User = require('../mongodb/userschema');


// User Schema
const UserType = new GraphQLObjectType({
    name : "User",
    fields : () => ({
        id : {type : GraphQLID},
        Name : {type : GraphQLString},
        Age : {type : GraphQLInt},
        Email : {type : GraphQLString},
    }),

});

// Root Query for retriving user or users includes read operation
const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields :{
        users : {
            type : new GraphQLList(UserType),
            resolve: (parent,args)=>{
                return User.find();
            }
        },
        user : {
            type : UserType,
            args : {id : {type : GraphQLID}},
            resolve : (parent,args)=>{
                return User.findById({_id : args.id});
            }
        }
    }
})


// Mutation Query include Insert and Delete operation 
const MutationQuery = new GraphQLObjectType({
    name : "MutationQueryType",
    fields : {
        // Add User.
        addUser : {
            type : UserType,
            args : {
                name : {type : GraphQLNonNull(GraphQLString)},
                age : {type : GraphQLNonNull(GraphQLInt)},
                email : {type : GraphQLNonNull(GraphQLString)},
            },
            resolve : (parent,args)=>{
                const user = new User({
                    Name : args.name,
                    Age : args.age,
                    Email : args.email,
                });
                return user.save();
            }
        },
        // Delete User.
        deleteUser : {
            type : UserType,
            args : {
                id : {type : GraphQLNonNull(GraphQLID)}
            },
            resolve : (parent,args)=>{
                const deletedUser = User.findByIdAndDelete({_id : args.id});
                return  deletedUser;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : MutationQuery,
});