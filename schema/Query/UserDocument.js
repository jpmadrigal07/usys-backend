const UserDocument = require('../../models/userDocument');
const UserDocumentType = require('../typeDefs/UserDocument');
const { GraphQLID, GraphQLList } = require('graphql')

module.exports.getAllUserDocument = {
    type: GraphQLList(UserDocumentType),
    resolve: () => {
        return UserDocument.find()
    }
};

module.exports.getUserDocument = {
    type: UserDocumentType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return UserDocument.findById(args._id).exec()
    }
}