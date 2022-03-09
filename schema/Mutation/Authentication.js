const AuthPayloadType = require("../typeDefs/AuthPayload");
const User = require("../../models/user");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../../config/keys");
const { GraphQLString } = require("graphql");
const VerifyTokenType = require("../typeDefs/VerifyToken");

module.exports.login = {
  type: AuthPayloadType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { email, password } = User(args);
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user with that email");
      }
      const isValid = (await password) === user.password;
      if (!isValid) {
        throw new Error("Incorrect password");
      }
      // return jwt
      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email, role: user.userType },
        keys.cookieKey,
        { expiresIn: "1d" }
      );
      return {
        token,
        user,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
