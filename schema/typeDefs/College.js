const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const CollegeType = new GraphQLObjectType({
    name: "College",
    fields: () => ({
        _id: { type: GraphQLID },
        collegeName: { type: GraphQLString },
        collegeCode: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});
module.exports = CollegeType;