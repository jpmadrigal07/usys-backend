const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const UserType = require('./User');

const AuthPayloadType = new GraphQLObjectType({
    name: "AuthPayload",
    fields: () => ({
        token: { type: GraphQLString },
        user: { type: UserType }
    })
});
module.exports = AuthPayloadType;