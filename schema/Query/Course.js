const Course = require('../../models/course');
const CourseType = require('../typeDefs/Course');
const { GraphQLID, GraphQLList } = require('graphql')

module.exports.getAllCourse = {
    type: GraphQLList(CourseType),
    resolve: () => {
        return Course.find()
    }
};

module.exports.getCourse = {
    type: CourseType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return Course.findById(args._id).exec()
    }
}