const Document = require('../../models/document');
const DocumentType = require('../typeDefs/Document');
const { GraphQLID, GraphQLList } = require('graphql');

module.exports.getAllDocument = {
    type: GraphQLList(DocumentType),
    resolve: () => {
        return Document.find()
    }
};

module.exports.getDocument = {
    type: DocumentType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        return Document.findById(args._id).exec()
    }
}