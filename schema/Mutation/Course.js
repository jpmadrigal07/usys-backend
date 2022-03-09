const CourseType = require('../typeDefs/Course');
const Courses = require('../../models/course');
const { GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql')

module.exports.createCourse = {
    type: CourseType,
    args: {
        courseName: { type: GraphQLNonNull(GraphQLString) },
        courseCode: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (parent, args) => {
        const course = Courses(args)
        return course.save({courseName: args.courseName, courseCode: args.courseCode})
    }
};

module.exports.updateCourse = {
    type: CourseType,
    args: {
        _id: { type: GraphQLID },
        courseName: { type: GraphQLString },
        courseCode: { type: GraphQLString }
    },
    resolve: (parent, args) => {
        return Courses.findByIdAndUpdate({_id: args._id}, {courseName: args.courseName, courseCode: args.courseCode})
    }
};

module.exports.deleteCourse = {
    type: CourseType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        const course = Courses(args)
        return course.delete({_id: args._id})
    }
}