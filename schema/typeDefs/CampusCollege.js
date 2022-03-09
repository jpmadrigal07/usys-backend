
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const MainCampusType = require('./MainCampus');
const CollegeType =require('./College');
const CampusCollegeType = new GraphQLObjectType({
    name: "CampusCollege",
    fields: () => ({
        campusId: {
            type: MainCampusType,
            resolve: async (campusCollege) => {
                const mainCampus = await MainCampuses.findOne({_id: campusCollege.campusId});
                const satteliteCampus = await SatelliteCampuses.findOne({_id: campusCollege.campusId});
                return mainCampus ? mainCampus : satteliteCampus ? satteliteCampus : null;
            }
        },
        collegeId: {
            type: CollegeType,
            resolve: async (campusCollege) => {
                return await Colleges.findOne({_id: campusCollege.collegeId});
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        deletedAt: { type: GraphQLString }
    })
});
module.exports = CampusCollegeType;
