const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const student = require("./app/controllers/student.controller.js");
const classess = require("./app/controllers/class.controller");


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/getallstudent", (req, res) => {
  student.findAll(req, res)
});

app.get("/getclassesofstudent", (req, res) => {
  student.findClass(req, res)
});

app.post("/createstudent", (req, res) => {
  student.create(req, res)
});

app.put("/updatestudent", (req, res) => {
  student.updateStudent(req, res)
});

app.put("/updateclassofstudent", (req, res) => {
  student.updateClassOfStudent(req, res)
});

app.delete("/deletestudent", (req, res) => {
  student.delete(req, res)
});

app.get("/getallclassess", (req, res) => {
  classess.findAll(req, res)
});


app.get("/getstudentofspecificclass", (req, res) => {
  classess.findStudents(req, res)
});


app.post("/createclass", (req, res) => {
  classess.create(req, res)
});

app.put("/updateclass", (req, res) => {
  classess.updateClass(req, res)
});

app.put("/updatestudentofclass", (req, res) => {
  classess.updateStudentInClass(req, res)
});



app.delete("/deleteclass", (req, res) => {
  classess.delete(req, res)
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
