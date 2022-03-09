const mongoose = require('mongoose');
const keys = require("./config/keys");
const College = require("./models/college");
const Course = require("./models/course");
const MainCampus = require('./models/mainCampus');
const SatelliteCampus = require('./models/satelliteCampus');
const CampusCollege = require('./models/campusCollege');
const CollegeCourses = require('./models/collegeCourses');
const UserDocument = require('./models/userDocument');
const Document = require('./models/document');

const mongoDbFunction = async () => {
    try {
        mongoose.connect("[MONGODB_URI]", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        console.log('mongodb connected');
    } catch (error) {
        console.log(`Cant connect to db due to ${error}`);
        process.exit(-1);
    }

    await College.remove({});
    await Course.remove({});
    await MainCampus.remove({});
    await SatelliteCampus.remove({});
    await CampusCollege.remove({});
    await CollegeCourses.remove({});
    await UserDocument.remove({});
    await Document.remove({});

    const colleges = [{
            collegeName: "College of Teacher Education",
            collegeCode: "CTE"
        },
        {
            collegeName: "College of Criminal Justice Education",
            collegeCode: "CCJE"
        },
        {
            collegeName: "College of Hospitality Management and Tourism",
            collegeCode: "CHMT"
        },
        {
            collegeName: "College of Computer Studies",
            collegeCode: "CCS"
        },
        {
            collegeName: "College of Business Management and Accountancy",
            collegeCode: "CBMA"
        },
        {
            collegeName: "College of Fisheries",
            collegeCode: "COF"
        },
        {
            collegeName: "College of Foods, Nutrition and Dietetics",
            collegeCode: "CFND"
        },
        {
            collegeName: "College of Industrial Technology",
            collegeCode: "CIT"
        },
        {
            collegeName: "College of Agriculture",
            collegeCode: "CA"
        },
        {
            collegeName: "College of Nursing and Allied Health",
            collegeCode: "CONAH"
        },
        {
            collegeName: "College of Engineering",
            collegeCode: "COE"
        },
        {
            collegeName: "College of Law",
            collegeCode: "COL"
        },
        {
            collegeName: "College of Arts and Sciences",
            collegeCode: "CAS"
        },
        {
            collegeName: "Graduate Programs",
            collegeCode: "GP"
        },
        {
            collegeName: "Post-Graduate Programs",
            collegeCode: "PGP"
        },
        {
            collegeName: "Senior High School",
            collegeCode: "SHS"
        }
    ]

    const course = [{
            courseName: 'Bachelor of Elementary Education',
            courseCode: 'BEED'
        },
        {
            courseName: 'Bachelor of Physical Education',
            courseCode: 'BPHED'
        },
        {
            courseName: 'Bachelor of Technical – Vocational Teacher Education',
            courseCode: 'BTVTED'
        },
        {
            courseName: 'Bachelor of Secondary Education',
            courseCode: 'BSED'
        },
        {
            courseName: 'Bachelor of Technology and Livelihood Education',
            courseCode: 'BTLED'
        },
        {
            courseName: 'Bachelor of Science in Criminology',
            courseCode: 'BSCRIM'
        },
        {
            courseName: 'Bachelor of Science in Hospitality Management',
            courseCode: 'BSHM'
        },
        {
            courseName: 'Bachelor of Science in Tourism Management',
            courseCode: 'BSTM'
        },
        {
            courseName: 'Bachelor of Science in Information Technology',
            courseCode: 'BSINFO'
        },
        {
            courseName: 'Bachelor of Science in Computer Science',
            courseCode: 'BSCS'
        },
        {
            courseName: 'Bachelor of Science in Accountancy',
            courseCode: 'BSA'
        },
        {
            courseName: 'Bachelor of Science in Business Administration',
            courseCode: 'BSBA'
        },
        {
            courseName: 'Bachelor of Science in Fisheries',
            courseCode: 'BSF'
        },
        {
            courseName: 'Bachelor of Science in Agri-Fisheries Business Management',
            courseCode: 'BSAFBM'
        },
        {
            courseName: 'Bachelor of Science in Nutrition and Dietetics',
            courseCode: 'BSND'
        },
        {
            courseName: 'Bachelor of Science in Industrial Technology',
            courseCode: 'BSIT'
        },
        {
            courseName: 'Bachelor of Science in Agriculture',
            courseCode: 'BSAGRI'
        },
        {
            courseName: 'Bachelor of Science in Agribusiness',
            courseCode: 'BSAB'
        },
        {
            courseName: 'Bachelor of Agricultural Technology',
            courseCode: 'BAT'
        },
        {
            courseName: 'Bachelor of Science in Food Technology',
            courseCode: 'BSFT'
        },
        {
            courseName: 'Bachelor of Science in Nursing',
            courseCode: 'BSN'
        },
        {
            courseName: 'Bachelor of Science in Electrical Engineering',
            courseCode: 'BSEE'
        },
        {
            courseName: 'Bachelor of Science in Electronics Engineering',
            courseCode: 'BSECE'
        },
        {
            courseName: 'Bachelor of Science in Computer Engineering',
            courseCode: 'BSCOE'
        },
        {
            courseName: 'Bachelor of Science in Agricultural and Biosystems Engineering',
            courseCode: 'BSABE'
        },
        {
            courseName: 'Bachelor of Early Childhood Education',
            courseCode: 'BECE'
        },
        {
            courseName: 'Bachelor of Science in Information System',
            courseCode: 'BSIS'
        },
        {
            courseName: 'Bachelor of Science in Civil Engineering',
            courseCode: 'BSCE'
        },
        {
            courseName: 'Bachelor of Science in Mechanical Engineering',
            courseCode: 'BSME'
        },
        {
            courseName: 'Bachelor of Science in Office Administration',
            courseCode: 'BSOA'
        },
        {
            courseName: 'Bachelor of Science in Entrepreneurship',
            courseCode: 'BSENTREP'
        },
        {
            courseName: 'Bachelor of Science in Biology',
            courseCode: 'BSBIO'
        },
        {
            courseName: 'Bachelor of Arts in Broadcasting',
            courseCode: 'AB BROAD'
        },
        {
            courseName: 'Bachelor of Science in Chemistry',
            courseCode: 'BSCHEM'
        },
        {
            courseName: 'Bachelor of Science in Mathematics',
            courseCode: 'BSMATH'
        },
        {
            courseName: 'Bachelor of Science in Environmental Sciences',
            courseCode: 'BSES'
        },
        {
            courseName: 'The Law Curriculum leading to the Degree of Juris Doctor',
            courseCode: 'JD'
        },
        {
            courseName: 'Doctor of Education',
            courseCode: 'ED.D.'
        },
        {
            courseName: 'Doctor of Philosophy in Education',
            courseCode: 'PH.D.'
        },
        {
            courseName: 'Doctor of Philosophy in Agriculture',
            courseCode: 'PH.D.'
        },
        {
            courseName: 'Master of Arts in Education',
            courseCode: 'MAED'
        },
        {
            courseName: 'Master of Science in Fisheries',
            courseCode: 'MSF'
        },
        {
            courseName: 'Master of Science in Agriculture',
            courseCode: 'MSA'
        },
        {
            courseName: 'Master of Science in Information Technology',
            courseCode: 'MSIT'
        },
        {
            courseName: 'Master in Public Administration',
            courseCode: 'MPA'
        },
        {
            courseName: 'Certificate in Teaching Proficiency',
            courseCode: 'CTP'
        },
        {
            courseName: 'Post Baccalaureate Diploma in Alternative Learning System',
            courseCode: 'PBDALS'
        },
        {
            courseName: 'Certificate in Intensive English Language Proficiency for Foreign Students',
            courseCode: 'IELP'
        },
        {
            courseName: 'Bachelor of Science in Psychology',
            courseCode: 'BSP'
        },
        {
            courseName: 'Accountancy Business and Management',
            courseCode: 'ABM'
        },
        {
            courseName: 'Humanities and Social Sciences',
            courseCode: 'HUMSS'
        },
        {
            courseName: 'Science, Technology, Mathematics and Engineering',
            courseCode: 'STEM'
        },
        {
            courseName: 'Agri-Fishery Arts',
            courseCode: 'TVL - AFA'
        },
        {
            courseName: 'Home Economics',
            courseCode: 'TVL - HE'
        },
        {
            courseName: 'Industrial Arts',
            courseCode: 'TVL -IA'
        },
        {
            courseName: 'Information and Communications Technology',
            courseCode: 'TVL - ICT'
        },
        {
            courseName: 'Bachelor of Science Nutrition and Dietetics',
            courseCode: 'BSND'
        },
        {
            courseName: 'Bachelor of Science Food Technology',
            courseCode: 'BSFT'
        }
    ]

    const mainCampus = [
        {
          campusName: "Sta. Cruz",
          schoolName: "Laguna State Polytechnic University",
          email: "info@lspu.edu.ph",
          mobileNo: "(049) 557-3026",
          city: "Santa Cruz",
          state: "Laguna",
          address: "Brgy. Bubukal, Santa Cruz, Laguna"
        },
        {
          campusName: "Siniloan",
          schoolName: "Laguna State Polytechnic University",
          email: "icts_sc@lspu.edu.ph",
          mobileNo: "(049) 813-0452",
          city: "Siniloan",
          state: "Laguna",
          address: "L. De Leon Street, Siniloan, Laguna"
        },
        {
          campusName: "San Pablo",   
          schoolName: "Laguna State Polytechnic University",
          email: "icts@lspuspcc.edu.ph",
          mobileNo: "(049) 503-3704",
          city: "San Pablo",
          state: "Laguna",
          address: "Del Remedios, San Pablo City, Laguna"
        },
        {
          campusName: "Los Baños",
          schoolName: "Laguna State Polytechnic University",
          email: "lspureg@gmail.com",
          mobileNo: "(049) 827-0421",
          city: "Los Baños",
          state: "Laguna",
          address: "Malinta, Los Baños, Laguna"
        }
      
      ]

    const satelliteCampus = [
		{
			campusName: "Nagcarlan",
		    schoolName: "Laguna State Polytechnic University",
		    email: "flaviano.urera@lspu.edu.ph",
		    mobileNo: "09176307559",
		    city: "Nagcarlan",
		    state: "Laguna",
		    address: "Nagcarlan, Laguna",
		},
		{
			campusName: "Magdalena",
		    schoolName: "Laguna State Polytechnic University",
		    email: "flaviano.urera@lspu.edu.ph",
		    mobileNo: "09176307559",
		    city: "Magdalena",
		    state: "Laguna",
		    address: "Magdalena, Laguna",
		},
		{
			campusName: "Lopez",
		    schoolName: "Laguna State Polytechnic University",
		    email: "capellanflorencia@gmail.com",
		    mobileNo: "09998112917",
		    city: "Lopez",
		    state: "Quezon",
		    address: "Lopez, Quezon",
		},
	]

    const toInsert1 = await College.insertMany(colleges, {
        ordered: false
    })

    const toInsert2 = await Course.insertMany(course, {
        ordered: false
    })

    const toInsert3 = await MainCampus.insertMany(mainCampus, {
        ordered: false
    })

    const toInsert4 = await SatelliteCampus.insertMany(satelliteCampus, {
        ordered: false
    })

    
    const defaultDocuments = [
        {
            fileName: "2x2",
            isApplyToAllCourse: false,
            isApplyToAllAdmitType: true,
            applyToAdmitTypes: "New Student",
            isEnrolleeRequiredToUpload: true,
            isDocumentEnabled: true
        },
        {
            fileName: "Birth Certificate",
            isApplyToAllCourse: false,
            isApplyToAllAdmitType: true,
            applyToAdmitTypes: "New Student",
            isEnrolleeRequiredToUpload: true,
            isDocumentEnabled: true
        },
        {
            fileName: "Form138",
            isApplyToAllCourse: false,
            isApplyToAllAdmitType: true,
            applyToAdmitTypes: "New Student",
            isEnrolleeRequiredToUpload: true,
            isDocumentEnabled: true
        },
	]

    const toInsert5 = await Document.insertMany(defaultDocuments, {
        ordered: false
    })

    const mainCampuses = await MainCampus.find({});
    const satelliteCampuses = await SatelliteCampus.find({});
    const colleges2 = await College.find({});
    const courses = await Course.find({});

    if(courses && courses.length > 0 && mainCampuses && mainCampuses.length > 0) {
        const losBanos = mainCampuses.find((res) => res.campusName === "Los Baños");
        const sanPablo = mainCampuses.find((res) => res.campusName === "San Pablo");
        const staCruz = mainCampuses.find((res) => res.campusName === "Sta. Cruz");
        const siniloan = mainCampuses.find((res) => res.campusName === "Siniloan");

        const nagcarlan = satelliteCampuses.find((res) => res.campusName === "Nagcarlan");
        const magdalena = satelliteCampuses.find((res) => res.campusName === "Magdalena");
        const lopez = satelliteCampuses.find((res) => res.campusName === "Lopez");

        const cte = colleges2.find((res) => res.collegeName === "College of Teacher Education");
        const ccje = colleges2.find((res) => res.collegeName === "College of Criminal Justice Education");
        const chmt = colleges2.find((res) => res.collegeName === "College of Hospitality Management and Tourism");
        const ccs = colleges2.find((res) => res.collegeName === "College of Computer Studies");
        const cbma = colleges2.find((res) => res.collegeName === "College of Business Management and Accountancy");
        const cas = colleges2.find((res) => res.collegeName === "College of Arts and Sciences");
        const cf = colleges2.find((res) => res.collegeName === "College of Fisheries");
        const cfnd = colleges2.find((res) => res.collegeName === "College of Foods, Nutrition and Dietetics");
        const shs = colleges2.find((res) => res.collegeName === "Senior High School");
        const gs = colleges2.find((res) => res.collegeName === "Graduate Programs");
        const pg = colleges2.find((res) => res.collegeName === "Post-Graduate Programs");
        const ce = colleges2.find((res) => res.collegeName === "College of Engineering");
        const cit = colleges2.find((res) => res.collegeName === "College of Industrial Technology");
        const ca = colleges2.find((res) => res.collegeName === "College of Agriculture");
        const cnah = colleges2.find((res) => res.collegeName === "College of Nursing and Allied Health");

        const losBanosColleges = [
            {
                campusId: losBanos._id,
                collegeId: cte._id,
            },
            {
                campusId: losBanos._id,
                collegeId: ccje._id,
            },
            {
                campusId: losBanos._id,
                collegeId: chmt._id,
            },
            {
                campusId: losBanos._id,
                collegeId: ccs._id,
            },
            {
                campusId: losBanos._id,
                collegeId: cbma._id,
            },
            {
                campusId: losBanos._id,
                collegeId: cas._id,
            },
            {
                campusId: losBanos._id,
                collegeId: cf._id,
            },
            {
                campusId: losBanos._id,
                collegeId: cfnd._id,
            },
            {
                campusId: losBanos._id,
                collegeId: shs._id,
            },
            {
                campusId: losBanos._id,
                collegeId: gs._id,
            },
            {
                campusId: losBanos._id,
                collegeId: pg._id,
            }
        ]

        const sanPabloColleges = [
            {
                campusId: sanPablo._id,
                collegeId: cte._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: ccje._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: chmt._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: ccs._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: cbma._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: cas._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: ce._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: cit._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: shs._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: gs._id,
            },
            {
                campusId: sanPablo._id,
                collegeId: pg._id,
            }
        ]

        const siniloanColleges = [
            {
                campusId: siniloan._id,
                collegeId: cte._id,
            },
            {
                campusId: siniloan._id,
                collegeId: ccje._id,
            },
            {
                campusId: siniloan._id,
                collegeId: chmt._id,
            },
            {
                campusId: siniloan._id,
                collegeId: ccs._id,
            },
            {
                campusId: siniloan._id,
                collegeId: cbma._id,
            },
            {
                campusId: siniloan._id,
                collegeId: cas._id,
            },
            {
                campusId: siniloan._id,
                collegeId: ce._id,
            },
            {
                campusId: siniloan._id,
                collegeId: ca._id,
            },
            {
                campusId: siniloan._id,
                collegeId: shs._id,
            },
            {
                campusId: siniloan._id,
                collegeId: gs._id,
            },
            {
                campusId: siniloan._id,
                collegeId: pg._id,
            }
        ]

        const staCruzColleges = [
            {
                campusId: staCruz._id,
                collegeId: cte._id,
            },
            {
                campusId: staCruz._id,
                collegeId: ccje._id,
            },
            {
                campusId: staCruz._id,
                collegeId: chmt._id,
            },
            {
                campusId: staCruz._id,
                collegeId: ccs._id,
            },
            {
                campusId: staCruz._id,
                collegeId: cbma._id,
            },
            {
                campusId: staCruz._id,
                collegeId: cas._id,
            },
            {
                campusId: staCruz._id,
                collegeId: ce._id,
            },
            {
                campusId: staCruz._id,
                collegeId: cnah._id,
            },
            {
                campusId: staCruz._id,
                collegeId: cit._id,
            },
            {
                campusId: staCruz._id,
                collegeId: shs._id,
            },
            {
                campusId: staCruz._id,
                collegeId: gs._id,
            },
            {
                campusId: staCruz._id,
                collegeId: pg._id,
            }
        ]

        const nagcarlanColleges = [
            {
                campusId: nagcarlan._id,
                collegeId: cte._id,
            },
            {
                campusId: staCruz._id,
                collegeId: ca._id,
            }
        ]

        const magdalenaColleges = [
            {
                campusId: magdalena._id,
                collegeId: chmt._id,
            },
            {
                campusId: magdalena._id,
                collegeId: ca._id,
            }
        ]

        const lopezColleges = [
            {
                campusId: lopez._id,
                collegeId: ccje._id,
            },
            {
                campusId: lopez._id,
                collegeId: cte._id,
            },
            {
                campusId: lopez._id,
                collegeId: ca._id,
            },
            {
                campusId: lopez._id,
                collegeId: cf._id,
            }
        ]
        
        const lbCampusInsert = await CampusCollege.insertMany(losBanosColleges, {
            ordered: false
        })

        const spCampusInsert = await CampusCollege.insertMany(sanPabloColleges, {
            ordered: false
        })

        const sCampusInsert = await CampusCollege.insertMany(siniloanColleges, {
            ordered: false
        })

        const scCampusInsert = await CampusCollege.insertMany(staCruzColleges, {
            ordered: false
        })

        const mCampusInsert = await CampusCollege.insertMany(magdalenaColleges, {
            ordered: false
        })

        const nCampusInsert = await CampusCollege.insertMany(nagcarlanColleges, {
            ordered: false
        })

        const lCampusInsert = await CampusCollege.insertMany(lopezColleges, {
            ordered: false
        })

        const bee = courses.find((res) => res.courseName === "Bachelor of Elementary Education");
        const bpe = courses.find((res) => res.courseName === "Bachelor of Physical Education");
        const btvte = courses.find((res) => res.courseName === "Bachelor of Technical – Vocational Teacher Education");
        const bse = courses.find((res) => res.courseName === "Bachelor of Secondary Education");
        const btle = courses.find((res) => res.courseName === "Bachelor of Technology and Livelihood Education");
        const bsc = courses.find((res) => res.courseName === "Bachelor of Science in Criminology");
        const bshm = courses.find((res) => res.courseName === "Bachelor of Science in Hospitality Management");
        const bstm = courses.find((res) => res.courseName === "Bachelor of Science in Tourism Management");
        const bsit = courses.find((res) => res.courseName === "Bachelor of Science in Information Technology");
        const bscs = courses.find((res) => res.courseName === "Bachelor of Science in Computer Science");
        const bsa = courses.find((res) => res.courseName === "Bachelor of Science in Accountancy");
        const bsba = courses.find((res) => res.courseName === "Bachelor of Science in Business Administration");
        const bsf = courses.find((res) => res.courseName === "Bachelor of Science in Fisheries");
        const bsabm = courses.find((res) => res.courseName === "Bachelor of Science in Agri-Fisheries Business Management");
        const bsft = courses.find((res) => res.courseName === "Bachelor of Science in Food Technology");
        const bsit2 = courses.find((res) => res.courseName === "Bachelor of Science in Industrial Technology");
        const bsa2 = courses.find((res) => res.courseName === "Bachelor of Science in Agriculture");
        const bsa3 = courses.find((res) => res.courseName === "Bachelor of Science in Agribusiness");
        const bat = courses.find((res) => res.courseName === "Bachelor of Agricultural Technology");
        const bsn = courses.find((res) => res.courseName === "Bachelor of Science in Nursing");
        const bsee = courses.find((res) => res.courseName === "Bachelor of Science in Electrical Engineering");
        const bsee2 = courses.find((res) => res.courseName === "Bachelor of Science in Electronics Engineering");
        const bsce = courses.find((res) => res.courseName === "Bachelor of Science in Computer Engineering");
        const bsabe = courses.find((res) => res.courseName === "Bachelor of Science in Agricultural and Biosystems Engineering");
        const bece = courses.find((res) => res.courseName === "Bachelor of Early Childhood Education");
        const bsis = courses.find((res) => res.courseName === "Bachelor of Science in Information System");
        const bsce2 = courses.find((res) => res.courseName === "Bachelor of Science in Civil Engineering");
        const bsme = courses.find((res) => res.courseName === "Bachelor of Science in Mechanical Engineering");
        const bsoa = courses.find((res) => res.courseName === "Bachelor of Science in Office Administration");
        const bse2 = courses.find((res) => res.courseName === "Bachelor of Science in Entrepreneurship");
        const bsb = courses.find((res) => res.courseName === "Bachelor of Science in Biology");
        const bab = courses.find((res) => res.courseName === "Bachelor of Arts in Broadcasting");
        const bsc2 = courses.find((res) => res.courseName === "Bachelor of Science in Chemistry");
        const bsm = courses.find((res) => res.courseName === "Bachelor of Science in Mathematics");
        const bses = courses.find((res) => res.courseName === "Bachelor of Science in Environmental Sciences");
        const de = courses.find((res) => res.courseName === "Doctor of Education");
        const dpe = courses.find((res) => res.courseName === "Doctor of Philosophy in Education");
        const dpa = courses.find((res) => res.courseName === "Doctor of Philosophy in Agriculture");
        const mae = courses.find((res) => res.courseName === "Master of Arts in Education");
        const msf = courses.find((res) => res.courseName === "Master of Science in Fisheries");
        const msa = courses.find((res) => res.courseName === "Master of Science in Agriculture");
        const msit = courses.find((res) => res.courseName === "Master of Science in Information Technology");
        const mpa = courses.find((res) => res.courseName === "Master in Public Administration");
        const ctp = courses.find((res) => res.courseName === "Certificate in Teaching Proficiency");
        const pbdals = courses.find((res) => res.courseName === "Post Baccalaureate Diploma in Alternative Learning System");
        const cielpfs = courses.find((res) => res.courseName === "Certificate in Intensive English Language Proficiency for Foreign Students");
        const bsp = courses.find((res) => res.courseName === "Bachelor of Science in Psychology");
        const abm = courses.find((res) => res.courseName === "Accountancy Business and Management");
        const hss = courses.find((res) => res.courseName === "Humanities and Social Sciences");
        const stme = courses.find((res) => res.courseName === "Science, Technology, Mathematics and Engineering");
        const aa = courses.find((res) => res.courseName === "Agri-Fishery Arts");
        const he = courses.find((res) => res.courseName === "Home Economics");
        const ia = courses.find((res) => res.courseName === "Industrial Arts");
        const ict = courses.find((res) => res.courseName === "Information and Communications Technology");
        const bsnd = courses.find((res) => res.courseName === "Bachelor of Science Nutrition and Dietetics");
        const jd = courses.find((res) => res.courseName === "The Law Curriculum leading to the Degree of Juris Doctor");

        const cteCourses = [
            {
                collegeId: cte._id,
                courseId: bee._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id, nagcarlan._id, lopez._id]
            },
            {
                collegeId: cte._id,
                courseId: bpe._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: cte._id,
                courseId: btvte._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id, nagcarlan._id]
            },
            {
                collegeId: cte._id,
                courseId: bse._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: cte._id,
                courseId: btle._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: cte._id,
                courseId: bece._id,
                campusIds: [siniloan._id]
            }
        ]

        const ccjeCourses = [
            {
                collegeId: ccje._id,
                courseId: bsc._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id, lopez._id]
            }
        ]

        const chmtCourses = [
            {
                collegeId: chmt._id,
                courseId: bshm._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: chmt._id,
                courseId: bstm._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id, magdalena._id]
            }
        ]

        const ccsCourses = [
            {
                collegeId: ccs._id,
                courseId: bsit._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: ccs._id,
                courseId: bscs._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: ccs._id,
                courseId: bsis._id,
                campusIds: [siniloan._id]
            }
        ]

        const cbmaCourses = [
            {
                collegeId: cbma._id,
                courseId: bsa._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id]
            },
            {
                collegeId: cbma._id,
                courseId: bsba._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id]
            }
        ]

        const casCourses = [
            {
                collegeId: cas._id,
                courseId: bsp._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: cas._id,
                courseId: bsb._id,
                campusIds: [sanPablo._id, staCruz._id]
            },
            {
                collegeId: cas._id,
                courseId: bab._id,
                campusIds: [staCruz._id]
            },
            {
                collegeId: cas._id,
                courseId: bsc._id,
                campusIds: [staCruz._id]
            },
            {
                collegeId: cas._id,
                courseId: bsm._id,
                campusIds: [staCruz._id]
            },
        ]
        
        const cfCourses = [
            {
                collegeId: cf._id,
                courseId: bsf._id,
                campusIds: [losBanos._id]
            },
            {
                collegeId: cas._id,
                courseId: bsabm._id,
                campusIds: [losBanos._id, lopez._id]
            }
        ]

        const cfndCourses = [
            {
                collegeId: cfnd._id,
                courseId: bsft._id,
                campusIds: [losBanos._id, nagcarlan._id]
            },
            {
                collegeId: cfnd._id,
                courseId: bsnd._id,
                campusIds: [losBanos._id]
            }
        ]

        const shsCourses = [
            {
                collegeId: shs._id,
                courseId: abm._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: shs._id,
                courseId: hss._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: shs._id,
                courseId: ict._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: shs._id,
                courseId: aa._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            }
        ]

        const gsCourses = [
            {
                collegeId: gs._id,
                courseId: de._id,
                campusIds: [losBanos._id, sanPablo._id, staCruz._id]
            },
            {
                collegeId: gs._id,
                courseId: mae._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: gs._id,
                courseId: msit._id,
                campusIds: [sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: gs._id,
                courseId: msf._id,
                campusIds: [losBanos._id]
            },
            {
                collegeId: gs._id,
                courseId: msa._id,
                campusIds: [siniloan._id]
            },
            {
                collegeId: gs._id,
                courseId: dpa._id,
                campusIds: [siniloan._id]
            }
        ]

        const pgCourses = [
            {
                collegeId: pg._id,
                courseId: ctp._id,
                campusIds: [losBanos._id, sanPablo._id, siniloan._id, staCruz._id]
            },
            {
                collegeId: pg._id,
                courseId: jd._id,
                campusIds: [losBanos._id]
            }
        ]

        const caCourses = [
            {
                collegeId: ca._id,
                courseId: bsa2._id,
                campusIds: [nagcarlan._id, magdalena._id, lopez._id]
            },
            {
                collegeId: ca._id,
                courseId: bat._id,
                campusIds: [lopez._id]
            }
        ]

        

        const cteCollegeCourses = await CollegeCourses.insertMany(cteCourses, {
            ordered: false
        })

        const ccjeCollegeCourses = await CollegeCourses.insertMany(ccjeCourses, {
            ordered: false
        })

        const chmtCollegeCourses = await CollegeCourses.insertMany(chmtCourses, {
            ordered: false
        })

        const ccsCollegeCourses = await CollegeCourses.insertMany(ccsCourses, {
            ordered: false
        })

        const cbmaCollegeCourses = await CollegeCourses.insertMany(cbmaCourses, {
            ordered: false
        })

        const casCollegeCourses = await CollegeCourses.insertMany(casCourses, {
            ordered: false
        })

        const cfCollegeCourses = await CollegeCourses.insertMany(cfCourses, {
            ordered: false
        })

        const cfndCollegeCourses = await CollegeCourses.insertMany(cfndCourses, {
            ordered: false
        })

        const shsCollegeCourses = await CollegeCourses.insertMany(shsCourses, {
            ordered: false
        })

        const gsCollegeCourses = await CollegeCourses.insertMany(gsCourses, {
            ordered: false
        })

        const pgCollegeCourses = await CollegeCourses.insertMany(pgCourses, {
            ordered: false
        })

        const caCollegeCourses = await CollegeCourses.insertMany(caCourses, {
            ordered: false
        })

    }

};

// before running this script, be advised that all of the existing data will be deleted
// mongoDbFunction();