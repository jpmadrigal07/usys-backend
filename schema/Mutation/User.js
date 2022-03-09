const UserType = require('../typeDefs/User');
const User = require('../../models/user');
const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')

module.exports.createUser = {
    type: UserType,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, args) => {
        const user = User(args)
        return user.save({
        email:args.email,
        password:args.password,
        userType:args.userType
        })
    }
};

module.exports.updateUser = {
    type: UserType,
    args: {
        _id: { type: GraphQLID },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, args) => {
        return User.findByIdAndUpdate({_id: args._id}, {
            email:args.email,
            password:args.password,
            userType:args.userType,
             updatedAt: new Date()
        })
    }
};

module.exports.deleteUser = {
    type: UserType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        const user = User(args)
        return user.delete({_id: args._id})
    }
};