module.exports = app => {
    const students = require("./turorial.routes");
    const classess = require("./classes.routes");
    let express = require('express')
    const router = express.Router();


    const defaultRoutes = [
        {
            path: '/student',
            route: students,
        },
        {
            path: '/class',
            route: classess,
        },
    ];

    defaultRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });



    //updated
    module.exports = router;


};