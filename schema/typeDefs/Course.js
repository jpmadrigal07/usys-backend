
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');

const CourseType = new GraphQLObjectType({
    name: "Course",
    fields: () => ({
        _id: { type: GraphQLID },
        courseName: { type: GraphQLString },
        courseCode: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});

module.exports =CourseType;