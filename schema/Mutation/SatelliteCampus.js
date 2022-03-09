const SatelliteCampusType = require('../typeDefs/SatelliteCampus');
const SatelliteCampuses = require('../../models/satelliteCampus');
const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')

module.exports.createSatelliteCampus = {
    type: SatelliteCampusType,
    args: {
        campusName: { type: GraphQLNonNull(GraphQLString) },
        mainCampusId: { type: GraphQLNonNull(GraphQLID) },
        schoolName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        mobileNumber: { type: GraphQLNonNull(GraphQLString) },
        currency: { type: GraphQLNonNull(GraphQLString) },
        currencySymbol: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },

    },
    resolve: (parent, args) => {
        const sateliteCampus = SatelliteCampuses(args)
        return sateliteCampus.save({
        campusName: args.campusName,
        mainCampusId:args.mainCampusId,
        schoolName: args.schoolName,
        email: args.email,
        mobileNumber: args.mobileNumber,
        currency: args.currency,
        currencySymbol: args.currencySymbol,
        city: args.city,
        state: args.state,
        address: args.address
        })
    }
};

module.exports.updateSatelliteCampus = {
    type: SatelliteCampusType,
    args: {
        _id: { type: GraphQLID },
        campusName: { type: GraphQLNonNull(GraphQLString) },
        mainCampusId: { type: GraphQLNonNull(GraphQLID) },
        schoolName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        mobileNumber: { type: GraphQLNonNull(GraphQLString) },
        currency: { type: GraphQLNonNull(GraphQLString) },
        currencySymbol: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, args) => {
        return SatelliteCampuses.findByIdAndUpdate({_id: args._id}, {
        campusName: args.campusName,
        mainCampusId:args.mainCampusId,
        schoolName: args.schoolName,
        email: args.email,
        mobileNumber: args.mobileNumber,
        currency: args.currency,
        currencySymbol: args.currencySymbol,
        city: args.city,
        state: args.state,
        address: args.address,
        updatedAt: new Date()
        })
    }
};

module.exports.deleteSatelliteCampus = {
    type: SatelliteCampusType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        const sateliteCampus = SatelliteCampuses(args)
        return sateliteCampus.delete({_id: args._id})
    }
};