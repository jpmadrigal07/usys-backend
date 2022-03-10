const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const AuthRoute = require("./routes/auth");
const CampusCollegeRoute = require("./routes/campusCollege");
const CollegeRoute = require("./routes/college");
const CollegeCoursesRoute = require("./routes/collegeCourses");
const CourseRoute = require("./routes/course");
const MainCampusRoute = require("./routes/mainCampus");
const SatelliteCampusRoute = require("./routes/satelliteCampus");
const StudentRoute = require("./routes/student");
const UserRoute = require("./routes/user");
const Document = require("./routes/document");
const UserDocument = require("./routes/userDocument");
const PrivilegeRoute = require("./routes/privilege");
const UserLevelRoute = require("./routes/userLevel");
const UserPrivilegesRoute = require("./routes/userPrivileges");
const SemesterRoute = require("./routes/semester");
const CashierRoute = require("./routes/cashier");
const StudentLevelRoute = require("./routes/studentLevel");
const SubjectsRoute = require("./routes/subjects");
const CurriculumRoute = require("./routes/curriculum");
require("./services/passport");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const schema = require("./schema/schemas");

// Connect to Mongo
mongoose
  .connect(keys.mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// REST API
app.use("/api/auth", AuthRoute);
app.use("/api/campusCollege", CampusCollegeRoute);
app.use("/api/college", CollegeRoute);
app.use("/api/collegeCourses", CollegeCoursesRoute);
app.use("/api/course", CourseRoute);
app.use("/api/mainCampus", MainCampusRoute);
app.use("/api/satelliteCampus", SatelliteCampusRoute);
app.use("/api/student", StudentRoute);
app.use("/api/user", UserRoute);
app.use("/api/document", Document);
app.use("/api/userDocument", UserDocument);
app.use("/api/privilege", PrivilegeRoute);
app.use("/api/userLevel", UserLevelRoute);
app.use("/api/userPrivileges", UserPrivilegesRoute);
app.use("/api/semester", SemesterRoute);
app.use("/api/cashier", CashierRoute);
app.use("/api/studentLevel", StudentLevelRoute);
app.use("/api/subjects", SubjectsRoute);
app.use("/api/curriculum", CurriculumRoute);
// GRAPHQL
app.use("/lspu", (req, res) => {
  graphqlHTTP({
    schema,
    graphiql: { headerEditorEnabled: true },
    context: { req },
  })(req, res);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`GraphQL: /lspu`);
  console.log(`REST API: /api/**`);
});
