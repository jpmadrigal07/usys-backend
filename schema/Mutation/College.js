const CollegeType = require("../typeDefs/College");
const Colleges = require('../../models/college');
const { GraphQLID, GraphQLNonNull, GraphQLString } = require("graphql");
const { checkIfUserTypesValid } = require("../helper");

// Allowed user types
const userTypes = ['Student'];

module.exports.createCollege = {
  type: CollegeType,
  args: {
    collegeName: { type: GraphQLNonNull(GraphQLString) },
    collegeCode: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (parent, args, { req }) => {
    // Check if loggedIn user is allowed
    const isUserTypesValid = checkIfUserTypesValid(req, userTypes);
    if (!isUserTypesValid) {
      throw new Error('You are not authorized to access this action')
    }
    const college = Colleges(args);
    return college.save({
      collegeName: args.collegeName,
      collegeCode: args.collegeCode,
    });
  },
};

module.exports.updateCollege = {
  type: CollegeType,
  args: {
    _id: { type: GraphQLID },
    collegeName: { type: GraphQLString },
    collegeCode: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return Colleges.findByIdAndUpdate(
      { _id: args._id },
      { collegeName: args.collegeName, collegeCode: args.collegeCode }
    );
  },
};

module.exports.deleteCollege = {
  type: CollegeType,
  args: {
    _id: { type: GraphQLID },
  },
  resolve: (parent, args) => {
    const college = Colleges(args);
    return college.delete({ _id: args._id });
  },
};
