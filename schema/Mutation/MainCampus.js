const MainCampusType = require('../typeDefs/MainCampus');
const MainCampuses = require('../../models/mainCampus');
const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')

module.exports.createMainCampus = {
    type: MainCampusType,
    args: {
        campusName: { type: GraphQLNonNull(GraphQLString) },
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
        const mainCampus = MainCampuses(args)
        return mainCampus.save({
        campusName: args.campusName,
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

module.exports.updateMainCampus = {
    currentDate:Date.now,
    type: MainCampusType,
    args: {
        _id: { type: GraphQLID },
        campusName: { type: GraphQLNonNull(GraphQLString) },
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
        return MainCampuses.findByIdAndUpdate({_id: args._id}, {
        campusName: args.campusName,
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

module.exports.deleteMainCampus = {
    type: MainCampusType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        const mainCampus = MainCampuses(args)
        return mainCampus.delete({_id: args._id})
    }
};