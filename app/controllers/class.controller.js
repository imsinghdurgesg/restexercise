const { mongoose } = require("../models");
const db = require("../models");
const Class = db.class;
const Student = db.tutorials;

// Create and Save a new Class
exports.create = (req, res) => {
    // Validate request
    if (!req.body.code) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Class
    const classes = new Class({
        code: req.body.code,
        title: req.body.title,
        description: req.body.description
    });

    // Save Class in the database
    classes
        .save(classes)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the class."
            });
        });
};

// Retrieve all Classes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Class.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Class."
            });
        });
};



// Find a single Class with an id
exports.findOne = (req, res) => {
    const id = req.query.id;

    Class.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found class with id " + id });
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving class with id=" + id });
        });
};

// Find all the student associated with the class
exports.findStudents = async (req, res) => {
    const id = req.query.id;

    const aClass = await Class.findById(id);
    console.log("studentids: " + aClass.studentIds);

    const students = await Student.find({
        _id: {
            "$in": [...aClass.studentIds]
        }
    })
    console.log("students: ", students)
    if (students) {
        res.send(students)
    } else {
        res.status(404).send({ message: "Not found class with id " + id });
    }

};

// Update a Class by the id in the request
exports.updateStudentsInaClass = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.body.id;
    //console.log("req: ", req.body)
    //console.log("id: ", id)
    const studentId = req.body.studentIds;

    const aClass = await Class.findById(id);
    if (aClass) {
        aClass.studentIds.push(studentId)
        await aClass.save();
        res.send({ message: "Class was updated successfully." })
    } else {
        res.status(404).send({
            message: `Cannot delete Class with id=${id}. Maybe Class was not found!`
        });
    }


};

// Update a Student by the id in the request
exports.updateClass = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.query.id;

    Class.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Class with id=${id}. Maybe Class was not found!`
                });
            } else res.send({ message: "Class was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Class with id=" + id
            });
        });
};


exports.updateStudentInClass = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.query.id;

    Class.findByIdAndUpdate(id, { "$push": req.body }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found!`
                });
            } else res.send({ message: "Student was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });
};



// Delete a Class with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Class.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Class with id=${id}. Maybe Class was not found!`
                });
            } else {
                res.send({
                    message: "Class was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Class with id=" + id
            });
        });
};

// Delete all Class from the database.
exports.deleteAll = (req, res) => {
    Class.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Class were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Class."
            });
        });
};

// Find all published Class
exports.findAllPublished = (req, res) => {
    Class.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Class."
            });
        });
};
