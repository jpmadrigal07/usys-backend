const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');
// Query Functions
const { getAllDocument, getDocument } = require('./Query/Document');
const { getAllUserDocument, getUserDocument } = require('./Query/UserDocument');
const { getAllCampusCollege, getCampusCollege } = require('./Query/CampusCollege');
const { getAllCollege, getCollege } = require('./Query/College');
const { getAllCollegeCourse, getCollegeCourse } = require('./Query/CollegeCourse');
const { getAllCourse, getCourse } = require('./Query/Course');
const { getAllMainCampus, getMainCampus } = require('./Query/MainCampus');
const { getAllSatelliteCampus, getSatelliteCampus } = require('./Query/SatelliteCampus');
const { getAllStudent, getStudent } = require('./Query/Student');
const { getAllUser, getUser } = require('./Query/User');
const { verifyToken } = require('./Query/Authentication');
// Mutation Functions
const { createCollege, updateCollege, deleteCollege } = require('./Mutation/College');
const { createCourse, updateCourse, deleteCourse } = require('./Mutation/Course');
const { createMainCampus, updateMainCampus, deleteMainCampus } = require('./Mutation/MainCampus');
const { createSatelliteCampus, updateSatelliteCampus, deleteSatelliteCampus } = require('./Mutation/SatelliteCampus');
const { createStudent, updateStudent, deleteStudent } = require('./Mutation/Student');
const { createUser, updateUser, deleteUser } = require('./Mutation/User');
const { login } = require('./Mutation/Authentication');

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        Documents: getAllDocument,
        Document: getDocument,
        UserDocuments: getAllUserDocument,
        UserDocument: getUserDocument,
        CampusColleges: getAllCampusCollege,
        CampusCollege: getCampusCollege,
        Colleges: getAllCollege,
        College: getCollege,
        Courses: getAllCourse,
        Course: getCourse,
        CollegeCourses: getAllCollegeCourse,
        CollegeCourse: getCollegeCourse,
        MainCampuses: getAllMainCampus,
        MainCampus: getMainCampus,
        SatelliteCampuses: getAllSatelliteCampus,
        SatelliteCampus: getSatelliteCampus,
        Students: getAllStudent,
        Student: getStudent,
        Users: getAllUser,
        User: getUser,
        VerifyToken: verifyToken
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCollege: createCollege,
        UpdateCollege: updateCollege,
        DeleteCollege: deleteCollege,
        CreateCourse: createCourse,  
        UpdateCourse: updateCourse,
        DeleteCourse: deleteCourse,
        CreateMainCampus: createMainCampus,
        UpdateMainCampus: updateMainCampus,
        DeleteMainCampus: deleteMainCampus,
        CreateSatelliteCampus: createSatelliteCampus,
        UpdateSatelliteCampus: updateSatelliteCampus,
        DeleteSatelliteCampus: deleteSatelliteCampus,
        CreateStudent: createStudent,
        UpdateStudent: updateStudent,
        DeleteStudent: deleteStudent,
        CreateUser: createUser,
        UpdateUser: updateUser,
        DeleteUser: deleteUser,
        Login: login
    }
});


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});