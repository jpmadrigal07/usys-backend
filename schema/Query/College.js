const College = require('../../models/college');
const CollegeType = require('../typeDefs/College');
const { GraphQLID, GraphQLList } = require('graphql')

module.exports.getAllCollege = {
    type: GraphQLList(CollegeType),
    resolve: () => {
        return College.find()
    }
};

module.exports.getCollege = {
    type: CollegeType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return College.findById(args._id).exec()
    }
}