"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLessonsList = exports.getPurchasedCourses = exports.purchaseCourse = exports.getAllCourses = exports.userLogin = exports.userSignup = void 0;
const user_models_1 = require("../models/user.models");
const course_models_1 = require("../models/course.models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSignup = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //parameters from req
    //validating the parameters
    //checking if user already exist
    //if not then create the user
    //return the user
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    const existedUser = yield user_models_1.User.findOne({ email: email });
    if (existedUser) {
        throw new ApiError_1.ApiError(400, "User already exist");
    }
    const user = yield user_models_1.User.create({
        firstName,
        lastName,
        email,
        password
    });
    const createdUser = yield user_models_1.User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError_1.ApiError(500, "Error while creating the User");
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(201, {
        createdUser
    }, "User created successfully"));
}));
exports.userLogin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Fetching parameters from req
    //validating the parameters
    //check if user exist
    //if exist the create the jwt token
    //return res with jwt token
    const { email, password } = req === null || req === void 0 ? void 0 : req.body;
    if (!email || !password) {
        throw new ApiError_1.ApiError(400, "parameters required");
    }
    const user = yield user_models_1.User.findOne({ email: email });
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    const isCorrect = yield user.isPasswordCorrect(password);
    // console.log(isCorrect);
    if (!isCorrect) {
        throw new ApiError_1.ApiError(400, "Password incorrect");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id
    }, (process.env.JWT_SECRET || 'eljgf'), {
        expiresIn: (process.env.JWT_EXPIRY || '1h')
    });
    if (!token) {
        throw new ApiError_1.ApiError(500, "Error while creating the auth token");
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, {
        user,
        token
    }, "User logged in successfully"));
}));
exports.getAllCourses = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get all courses from db
    const courses = yield course_models_1.Course.find().populate('creator', 'firstName lastName').select('-lessons');
    if (!courses) {
        throw new ApiError_1.ApiError(404, "No courses available");
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, {
        courses
    }, "Courses fetched successfully"));
}));
exports.purchaseCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get parameters from req
    //validate the parameter
    //save the purchase details in db
    const userId = req === null || req === void 0 ? void 0 : req.userId;
    const { courseId } = req.body;
    if (!userId || !courseId) {
        throw new ApiError_1.ApiError(403, "parameters missing");
    }
    const course = yield course_models_1.Course.findById(courseId);
    if (!course) {
        throw new ApiError_1.ApiError(404, "Course not found");
    }
    const user = yield user_models_1.User.findById(userId).select("-password");
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    if (user.purchasedCourses.some(id => id.equals(courseId))) {
        throw new ApiError_1.ApiError(400, "Already purchased");
    }
    user.purchasedCourses.push(new mongoose_1.default.Types.ObjectId(courseId));
    user.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse_1.ApiResponse(201, {
        course
    }, "Course purchased successfully"));
}));
exports.getPurchasedCourses = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the inputs from req
    //validate the inputs
    //validate the user
    //fetch all the courses with courseIds
    //return all the fetch courses
    const userId = req === null || req === void 0 ? void 0 : req.userId;
    if (!userId) {
        throw new ApiError_1.ApiError(400, "User required");
    }
    // const user=await User.findById(userId);
    // if(!user){
    //     throw new ApiError(404,"User not found")
    // }
    // returns js native promise for each query and awaits for all promises to resolve and then returns array of resolved values
    // const courses=await Promise.all(user.purchasedCourses.map(courseId=>Course.findById(courseId).exec()));
    //finds user by id then populate it's purchasedCourses feild with courses from Course instead of ids
    const user = yield user_models_1.User.findById(userId).populate({ path: 'purchasedCourses', populate: { path: 'creator', select: 'firstName lastName' } }).exec();
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    const courses = user.purchasedCourses;
    if (!courses) {
        throw new ApiError_1.ApiError(500, "Error while fetching the courses");
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, {
        courses
    }, "Courses fetched successfully"));
}));
exports.getLessonsList = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get courseID
    //verify courseId
    //get the lessons with course
    const courseId = req.params.courseId;
    console.log(courseId);
    if (!courseId) {
        throw new ApiError_1.ApiError(400, 'course id misssing');
    }
    const lessonsList = yield course_models_1.Course.findById(courseId).select('lessons');
    if (!lessonsList) {
        throw new ApiError_1.ApiError(500, 'Error while fetching the lessons');
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, lessonsList, 'lessons fetched successfully'));
}));
