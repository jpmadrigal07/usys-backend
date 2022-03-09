const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const UserType = require('./User');
const MainCampusType = require('./MainCampus');

const StudentType = new GraphQLObjectType({
    name: "Student",
    fields: () => ({
        userId: {
            type: UserType,
            resolve: async (student) => {
                return await User.findOne({_id: student.userId});
            }
        },
        lrn: { type: GraphQLString },
        campusId: {
            type: MainCampusType,
            resolve: async (student) => {
                const mainCampus = await MainCampuses.findOne({_id: student.campusId});
                const satteliteCampus = await SatelliteCampuses.findOne({_id: student.campusId});
                return mainCampus ? mainCampus : satteliteCampus ? satteliteCampus : null;
            }
        },
        admitType: { type: GraphQLString },
        typeOfStudent: { type: GraphQLString },
        firstName: { type: GraphQLString },
        middleName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        extensionName: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        landlineNumber: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        placeOfBirth: { type: GraphQLString },
        gender: { type: GraphQLString },
        citizenship: { type: GraphQLString },
        houseNumber: { type: GraphQLString },
        street: { type: GraphQLString },
        barangay: { type: GraphQLString },
        municipality: { type: GraphQLString },
        province: { type: GraphQLString },
        zipCode: { type: GraphQLString },
        civilStatus: { type: GraphQLString },
        guardianName: { type: GraphQLString },
        guardianAddress: { type: GraphQLString },
        fathersName: { type: GraphQLString },
        mothersName: { type: GraphQLString },
        dswdHouseholdNumber: { type: GraphQLString },
        dswdHouseholdPerCapitaIncome: { type: GraphQLString },
        guardianMobileNumber: { type: GraphQLString },
        guardianEmail: { type: GraphQLString },
        relationWithGuardian: { type: GraphQLString },
        intendedCourse: { type: GraphQLString },
        educationalAttainment: { type: GraphQLString },
        disability: { type: GraphQLString },
        isIndigenousPerson: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});

module.exports = StudentType;