const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
 
const DocumentType = new GraphQLObjectType({
    name: "Document",
    fields: () => ({
        fileName: { type: GraphQLString },
        isApplyToAllCourse: { type: GraphQLBoolean },
        applyToCourses: { type: GraphQLID },
        isApplyToAllAdmitType: { type: GraphQLBoolean },
        applyToAdmitTypes: { type: GraphQLString },
        isEnrolleeRequiredToUpload: { type: GraphQLBoolean },
        isDocumentEnabled: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});

module.exports = DocumentType;
