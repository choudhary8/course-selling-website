import { Router } from "express";
import { getAllCourses, getPurchasedCourses, purchaseCourse, userLogin, userSignup } from "../controllers/users.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";

const userRouter=Router();

userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.get('/courses', verifyJWT, getAllCourses);
userRouter.post('/courses', verifyJWT, purchaseCourse);
userRouter.get('/courses/purchasedCourses', verifyJWT, getPurchasedCourses);

export default userRouter;