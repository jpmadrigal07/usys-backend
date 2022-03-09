const MainCampus = require('../../models/mainCampus');
const MainCampusType = require('../typeDefs/MainCampus');
const { GraphQLID, GraphQLList } = require('graphql')

module.exports.getAllMainCampus = {
    type: GraphQLList(MainCampusType),
    resolve: () => {
        return MainCampus.find()
    }
};

module.exports.getMainCampus = {
    type: MainCampusType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return MainCampus.findById(args._id).exec()
    }
}