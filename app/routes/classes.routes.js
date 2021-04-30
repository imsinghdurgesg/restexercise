module.exports = app => {
    const classes = require("../controllers/class.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/createclass", classes.create);

    // Retrieve all Tutorials
    router.get("/getallclass", classes.findAll);


    // Retrieve a single Tutorial with id
    router.get("/class:id", classes.findOne);

    // Update a Tutorial with id
    router.put("/class:id", classes.update);

    // Delete a Tutorial with id
    router.delete("/class:id", classes.delete);

    // Create a new Tutorial
    router.delete("/class", classes.deleteAll);

    //app.use("/api/exercises", router);
};
