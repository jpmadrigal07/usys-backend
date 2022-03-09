const StudentType = require('../typeDefs/Student');
const Student = require('../../models/student');
const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } = require('graphql')

module.exports.createStudent = {
    type: StudentType,
    args: {
        userId: { type: GraphQLID },
        lrn: { type: GraphQLNonNull(GraphQLString) },
        campusId: { type: GraphQLNonNull(GraphQLString) },
        admitType: {type:GraphQLString},
        typeOfStudent: {type:GraphQLString},
        firstName: {type:GraphQLString},
        middleName: {type:GraphQLString},
        lastName: {type:GraphQLString},
        extensionName: {type:GraphQLString},
        mobileNumber: {type:GraphQLString},
        landlineNumber: {type:GraphQLString},
        dateOfBirth: {type:GraphQLString},
        placeOfBirth: {type:GraphQLString},
        gender:{ type: GraphQLNonNull(GraphQLString) },
        citizenship: { type: GraphQLNonNull(GraphQLString) },
        houseNumber: { type: GraphQLNonNull(GraphQLString) },
        street: { type: GraphQLNonNull(GraphQLString) },
        barangay: { type: GraphQLNonNull(GraphQLString) },
        municipality: { type: GraphQLNonNull(GraphQLString) },
        province: { type: GraphQLNonNull(GraphQLString) },
        zipCode: { type: GraphQLNonNull(GraphQLString) },
        civilStatus:{ type: GraphQLNonNull(GraphQLString) },
        guardianName: { type: GraphQLNonNull(GraphQLString) },
        guardianAddress: { type: GraphQLNonNull(GraphQLString) },
        fathersName: { type: GraphQLNonNull(GraphQLString) },
        mothersName: { type: GraphQLNonNull(GraphQLString) },
        dswdHouseholdNumber: {type:GraphQLString},
        dswdHouseholdPerCapitaIncome: {type: GraphQLInt},
        guardianMobileNumber: { type: GraphQLNonNull(GraphQLString) },
        guardianEmail: { type: GraphQLNonNull(GraphQLString) },
        relationWithGuardian: { type: GraphQLNonNull(GraphQLString) },
        intendedCourse:{ type: GraphQLNonNull(GraphQLString) },
        educationalAttainment:{ type: GraphQLNonNull(GraphQLString) },
        disability:{type:GraphQLString},
        isIndigenousPerson:{type: GraphQLNonNull(GraphQLBoolean)},

    },
    resolve: (parent, args) => {
        const student = Student(args)
        return student.save({
            lrn: args.lrn, 
            campusId: args.campusId,
            admitType:args.admitType,
            typeOfStudent:args.typeOfStudent,
            firstName:args.firstName,
            middleName:args.middleName,
            lastName:args.lastName,
            extensionName:args.extensionName,
            mobileNumber:args.mobileNumber,
            landlineNumber:args.landlineNumber,
            dateOfBirth:args.dateOfBirth,
            placeOfBirth:args.placeOfBirth,
            gender:args.gender,
            citizenship:args.citizenship,
            houseNumber:args.houseNumber,
            street:args.street,
            barangay:args.barangay,
            municipality:args.municipality,
            province:args.province,
            zipCode:args.zipCode,
            civilStatus:args.civilStatus,
            guardianName:args.guardianName,
            guardianAddress:args.guardianAddress,
            fathersName:args.fathersName,
            mothersName:args.mothersName,
            dswdHouseholdNumber:args.dswdHouseholdNumber,
            dswdHouseholdPerCapitaIncome:args.dswdHouseholdPerCapitaIncome,
            guardianMobileNumber:args.guardianMobileNumber,
            guardianEmail:args.guardianEmail,
            relationWithGuardian:args.relationWithGuardian,
            intendedCourse:args.intendedCourse,
            educationalAttainment:args.educationalAttainment,
            disability:args.disability,
            isIndigenousPerson:args.isIndigenousPerson

        })
    }

};

module.exports.updateStudent = {
    type: StudentType,
    args: {
        _id: { type: GraphQLID },
        userId: { type: GraphQLID },
        lrn: { type: GraphQLNonNull(GraphQLString) },
        campusId: { type: GraphQLNonNull(GraphQLString) },
        admitType: {type:GraphQLString},
        typeOfStudent: {type:GraphQLString},
        firstName: {type:GraphQLString},
        middleName: {type:GraphQLString},
        lastName: {type:GraphQLString},
        extensionName: {type:GraphQLString},
        mobileNumber: {type:GraphQLString},
        landlineNumber: {type:GraphQLString},
        dateOfBirth: {type:GraphQLString},
        placeOfBirth: {type:GraphQLString},
        gender:{ type: GraphQLNonNull(GraphQLString) },
        citizenship: { type: GraphQLNonNull(GraphQLString) },
        houseNumber: { type: GraphQLNonNull(GraphQLString) },
        street: { type: GraphQLNonNull(GraphQLString) },
        barangay: { type: GraphQLNonNull(GraphQLString) },
        municipality: { type: GraphQLNonNull(GraphQLString) },
        province: { type: GraphQLNonNull(GraphQLString) },
        zipCode: { type: GraphQLNonNull(GraphQLString) },
        civilStatus:{ type: GraphQLNonNull(GraphQLString) },
        guardianName: { type: GraphQLNonNull(GraphQLString) },
        guardianAddress: { type: GraphQLNonNull(GraphQLString) },
        fathersName: { type: GraphQLNonNull(GraphQLString) },
        mothersName: { type: GraphQLNonNull(GraphQLString) },
        dswdHouseholdNumber: {type:GraphQLString},
        dswdHouseholdPerCapitaIncome: {type: GraphQLInt},
        guardianMobileNumber: { type: GraphQLNonNull(GraphQLString) },
        guardianEmail: { type: GraphQLNonNull(GraphQLString) },
        relationWithGuardian: { type: GraphQLNonNull(GraphQLString) },
        intendedCourse:{ type: GraphQLNonNull(GraphQLString) },
        educationalAttainment:{ type: GraphQLNonNull(GraphQLString) },
        disability:{type:GraphQLString},
        isIndigenousPerson:{type: GraphQLNonNull(GraphQLBoolean)},
    },
    resolve: (parent, args) => {
        return Student.findByIdAndUpdate(
            {_id: args._id},
             {
                 userId:args.userId,
                lrn: args.lrn, 
                campusId: args.campusId,
                admitType:args.admitType,
                typeOfStudent:args.typeOfStudent,
                firstName:args.firstName,
                middleName:args.middleName,
                lastName:args.lastName,
                extensionName:args.extensionName,
                mobileNumber:args.mobileNumber,
                landlineNumber:args.landlineNumber,
                dateOfBirth:args.dateOfBirth,
                placeOfBirth:args.placeOfBirth,
                gender:args.gender,
                citizenship:args.citizenship,
                houseNumber:args.houseNumber,
                street:args.street,
                barangay:args.barangay,
                municipality:args.municipality,
                province:args.province,
                zipCode:args.zipCode,
                civilStatus:args.civilStatus,
                guardianName:args.guardianName,
                guardianAddress:args.guardianAddress,
                fathersName:args.fathersName,
                mothersName:args.mothersName,
                dswdHouseholdNumber:args.dswdHouseholdNumber,
                dswdHouseholdPerCapitaIncome:args.dswdHouseholdPerCapitaIncome,
                guardianMobileNumber:args.guardianMobileNumber,
                guardianEmail:args.guardianEmail,
                relationWithGuardian:args.relationWithGuardian,
                intendedCourse:args.intendedCourse,
                educationalAttainment:args.educationalAttainment,
                disability:args.disability,
                isIndigenousPerson:args.isIndigenousPerson,
                updateStudent:Date.now
             })
    }
};

module.exports.deleteStudent = {
    type: StudentType,
    args: {
        _id: { type: GraphQLID }
    },
    resolve: (parent, args) => {
        const student = Student(args)
        return student.delete({_id: args._id})
    }
};