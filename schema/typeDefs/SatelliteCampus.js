const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');

const SatelliteCampusType = new GraphQLObjectType({
    name: "SatelliteCampus",
    fields: () => ({
        _id: { type: GraphQLID },
        campusName: { type: GraphQLString },
        mainCampusId: { type: GraphQLString },
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
module.exports = SatelliteCampusType;