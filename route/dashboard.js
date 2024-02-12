const express = require('express');
const dashboardRouter = express.Router();
const app = express();

/* ------------- controllers ------------------- */

const bannerController = require('../controllers/dashboard/bannerController');
const contactformController = require('../controllers/dashboard/contactformController');
const ourWorkController = require('../controllers/dashboard/ourWorkController');
const ourProjectsController = require('../controllers/dashboard/ourProjectsController');

/* -------------- parse of form ------------------- */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploades/");
    },
    filename: (req, file, cb) => {
        if(file){
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }
});

const upload = multer({
    storage: storage
});


/* ------------------------------------------------------ */
/* --------------------- route roles -------------------- */
/* ------------------------------------------------------ */
const authController = require("../controllers/dashboard/authController");

/* -------------- not auth pages ------------------- */
dashboardRouter.get('/signup', (req, res) => {
    authController.signup(req, res);
});

dashboardRouter.post('/storeUser', (req, res) => {
    authController.storeUser(req, res);
});

dashboardRouter.get('/signin', (req, res) => {
    authController.signin(req, res);
});

dashboardRouter.post('/verifySignin', (req, res) => {
    authController.verifySignin(req, res);
});

dashboardRouter.get('/logout', (req, res) => {
    authController.logout(req, res);
});

/* ------- auth --------- */
dashboardRouter.use(authController.isAthu);

/* ********** dashboard ************* */
dashboardRouter.get('/dashboard', (req, res) => {
    res.render("../views/dashboard/pages/index.ejs");
});

dashboardRouter.get('/dashboard/banner', (req, res) => {
    bannerController.index(req, res);
});
dashboardRouter.get('/dashboard/banner/show/:id', (req, res) => {
    bannerController.show(req, res);
});
dashboardRouter.get('/dashboard/banner/createForm', (req, res) => {
    bannerController.createForm(req, res);
});

/* ------------------------------- */

dashboardRouter.get('/dashboard/contactform', (req, res) => {
    contactformController.index(req, res);
});
dashboardRouter.get('/dashboard/contactform/show/:id', (req, res) => {
    contactformController.show(req, res);
});
dashboardRouter.get('/dashboard/contactform/destroy/:id', (req, res) => {
    contactformController.destroy(req, res);
});

/* ---------------Our Work---------------- */

dashboardRouter.get('/dashboard/ourWork', (req, res) => {
    ourWorkController.index(req, res);
});
dashboardRouter.get('/dashboard/ourWork/show/:id', (req, res) => {
    ourWorkController.show(req, res);
});
dashboardRouter.get('/dashboard/ourWork/addProject/:cat/:project', (req, res) => {
    ourWorkController.addProject(req, res);
});

/* ---------------Our Projects---------------- */

dashboardRouter.get('/dashboard/ourProjects', (req, res) => {
    ourProjectsController.index(req, res);
});
dashboardRouter.get('/dashboard/ourProjects/show/:id', (req, res) => {
    ourProjectsController.show(req, res);
});
// dashboardRouter.get('/dashboard/ourProjects/addProject/:cat/:project', (req, res) => {
//     ourProjectsController.addProject(req, res);
// });

module.exports = dashboardRouter;