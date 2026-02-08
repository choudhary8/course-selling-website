"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = require("../controllers/admin.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const multer_middlewares_1 = require("../middlewares/multer.middlewares");
const adminRouter = (0, express_1.Router)();
const fileUpload = multer_middlewares_1.upload.fields([
    {
        name: 'imge',
        maxCount: 1
    },
    {
        name: 'lessonVideo',
        maxCount: 1
    }
]);
// adminRouter.post('/signup',adminSignup);
// adminRouter.get('/login',adminLogin);
// adminRouter.get('/courses',getAllCourses);
adminRouter.put('/courses', auth_middlewares_1.verifyJWT, fileUpload, admin_controllers_1.editCourse);
adminRouter.post('/courses', auth_middlewares_1.verifyJWT, fileUpload, admin_controllers_1.createCourse);
adminRouter.get('/created-courses', auth_middlewares_1.verifyJWT, admin_controllers_1.getAllCreatedCourses);
adminRouter.post('/course/upload-lesson', auth_middlewares_1.verifyJWT, fileUpload, admin_controllers_1.uploadLesson);
exports.default = adminRouter;
