const CampusCollege = require('../../models/campusCollege');
const CampusCollegeType = require('../typeDefs/CampusCollege');
const { GraphQLID, GraphQLList } = require('graphql')

module.exports.getAllCampusCollege = {
    type: GraphQLList(CampusCollegeType),
    resolve: () => {
        return CampusCollege.find()
    }
};

module.exports.getCampusCollege = {
    type: CampusCollegeType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return CampusCollege.findById(args._id).exec()
    }
}