const jsonwebtoken = require("jsonwebtoken");
const keys = require("../config/keys");

exports.checkIfUserTypesValid = (req, userTypes) => {
    if(!req.headers.authorization) {
        return false;
    } 
    const token = req.headers.authorization.replace("Bearer ", "");
    const { role } = jsonwebtoken.verify(token, keys.cookieKey);
    return userTypes.includes(role);
};


