const CollegeCourse = require('../../models/collegeCourses');
const CollegeCourseType = require('../typeDefs/CollegeCourses');
const { GraphQLID, GraphQLList } = require('graphql')

module.exports.getAllCollegeCourse = {
    type: GraphQLList(CollegeCourseType),
    resolve: () => {
        return CollegeCourse.find()
    }
};

module.exports.getCollegeCourse = {
    type: CollegeCourseType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return CollegeCourse.findById(args._id).exec()
    }
}