const SatelliteCampus = require('../../models/satelliteCampus');
const SatelliteCampusType = require('../typeDefs/SatelliteCampus');
const { GraphQLID, GraphQLList } = require('graphql')

module.exports.getAllSatelliteCampus = {
    type: GraphQLList(SatelliteCampusType),
    resolve: () => {
        return SatelliteCampus.find()
    }
};

module.exports.getSatelliteCampus = {
    type: SatelliteCampusType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return SatelliteCampus.findById(args._id).exec()
    }
}