const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');

const MainCampusType = new GraphQLObjectType({
    name: "MainCampus",
    fields: () => ({
        _id: { type: GraphQLID },
        campusName: { type: GraphQLString },
        schoolName: { type: GraphQLString },
        email: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        currency: { type: GraphQLString },
        currencySymbol: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        address: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});
module.exports = MainCampusType;