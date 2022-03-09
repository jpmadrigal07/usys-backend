const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const DocumentType = require('../typeDefs/Document');
const UserType = require('../typeDefs/User');
 
const UserDocumentType = new GraphQLObjectType({
    name: "UserDocument",
    fields: () => ({
        documentId: {
            type: DocumentType,
            resolve: async (userDocument) => {
                return await Document.findOne({_id: userDocument.documentId});
            }
        },
        documentPath: { type: GraphQLString },
        userId: {
            type: UserType,
            resolve: async (userDocument) => {
                return await User.findOne({_id: userDocument.userId});
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});

module.exports = UserDocumentType;
