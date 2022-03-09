const { GraphQLObjectType, GraphQLString } = require('graphql');
 
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        userType: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});

module.exports = UserType;
