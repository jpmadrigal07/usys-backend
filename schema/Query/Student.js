const Student = require('../../models/student');
const StudentType = require('../typeDefs/Student');
const { GraphQLID, GraphQLList } = require('graphql')

module.exports.getAllStudent = {
    type: GraphQLList(StudentType),
    resolve: () => {
        return Student.find()
    }
};

module.exports.getStudent = {
    type: StudentType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return Student.findById(args._id).exec()
    }
}