
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const CourseType = require('./Course');
const CollegeType =require('./College');
const CollegeCoursesType = new GraphQLObjectType({
    name: "CollegeCourses",
    fields: () => ({
        collegeId: {
            type: CollegeType,
            resolve: async (collegeCourses) => {
                return await Colleges.findOne({_id: collegeCourses.collegeId});
            }
        },
        courseId: {
            type: CourseType,
            resolve: async (collegeCourses) => {
                return await Course.findOne({_id: collegeCourses.courseId});
            }
        },
        campusIds: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});
module.exports = CollegeCoursesType;