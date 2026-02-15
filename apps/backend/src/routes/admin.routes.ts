import { Router } from "express";
import { adminLogin, adminSignup, createCourse, deleteCourse, deleteLesson, editCourse, getAllCourses, getAllCreatedCourses, uploadLesson } from "../controllers/admin.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlewares";

const adminRouter=Router();

const fileUpload=upload.fields([
                    {
                        name:'imge',
                        maxCount:1
                    },
                    {
                        name:'lessonVideo',
                        maxCount:1
                    }
                ]);

// adminRouter.post('/signup',adminSignup);
// adminRouter.get('/login',adminLogin);
// adminRouter.get('/courses',getAllCourses);

adminRouter.put('/courses/:courseId', verifyJWT, fileUpload, editCourse);

adminRouter.post('/courses', verifyJWT, fileUpload, createCourse);

adminRouter.get('/created-courses',verifyJWT, getAllCreatedCourses);

adminRouter.post('/course/upload-lesson',verifyJWT, fileUpload, uploadLesson);

adminRouter.delete('/courses/course-delete/:courseId',verifyJWT,deleteCourse);

adminRouter.delete('/courses/lesson-delete/:courseId/:lessonId',verifyJWT,deleteLesson);

export default adminRouter;