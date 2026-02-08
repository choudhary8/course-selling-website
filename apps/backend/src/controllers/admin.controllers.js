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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLesson = exports.getAllCreatedCourses = exports.createCourse = exports.editCourse = exports.getAllCourses = exports.adminLogin = exports.adminSignup = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const user_models_1 = require("../models/user.models");
const course_models_1 = require("../models/course.models");
const ApiResponse_1 = require("../utils/ApiResponse");
const cloudinary_1 = require("../utils/cloudinary");
exports.adminSignup = 1;
exports.adminLogin = 1;
exports.getAllCourses = 1;
exports.editCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const files = req.files;
    const localFilePath = (_b = (_a = files === null || files === void 0 ? void 0 : files.imge) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path;
    const courseId = req.body.courseId;
    const course = yield course_models_1.Course.findById(courseId);
    if (!course) {
        throw new ApiError_1.ApiError(404, "Course not found");
    }
    const response = yield (0, cloudinary_1.uploadOnCloudinary)(localFilePath || '');
    if (!response) {
        throw new ApiError_1.ApiError(500, "Error while uploading file");
    }
    course.imageUrl = response === null || response === void 0 ? void 0 : response.url;
    yield course.save();
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, { course }, "img uploaded"));
}));
exports.createCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the inputs from frontend - userId, course details - title, image, descryption, price
    //validate the inputs
    //create new course
    //return the response
    var _a, _b;
    const creatorId = req.userId;
    const courseDetails = req.body;
    const files = req.files;
    const localFilePath = (_b = (_a = files === null || files === void 0 ? void 0 : files.imge) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path;
    const response = yield (0, cloudinary_1.uploadOnCloudinary)(localFilePath || '');
    const imageUrl = response === null || response === void 0 ? void 0 : response.url;
    Object.values(courseDetails).forEach(ele => {
        if (!ele) {
            throw new ApiError_1.ApiError(400, "Parameters missing");
        }
    });
    const creator = yield user_models_1.User.findById(creatorId);
    if (!creator) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    // const existedCourse=await Course.find({title:courseDetails.title})
    // if(existedCourse.length&&existedCourse[0].creator.equals(creatorId)){
    //     throw new ApiError(400,"Course Already Exist")
    // }
    const createdCourse = yield course_models_1.Course.create(Object.assign(Object.assign({}, courseDetails), { imageUrl, creator: creator._id }));
    if (!createdCourse) {
        throw new ApiError_1.ApiError(500, "Error while creating the course");
    }
    creator.createdCourses.push(createdCourse._id);
    creator.save();
    const courseInfo = Object.assign(Object.assign({}, createdCourse.toJSON()), { creator: creator.firstName + " " + creator.lastName });
    return res.status(200).json(new ApiResponse_1.ApiResponse(201, { courseInfo }, "Course created successfully"));
}));
exports.getAllCreatedCourses = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const user = yield user_models_1.User.findById(userId).populate({ path: 'createdCourses', populate: { path: 'creator', select: 'firstName lastName' } }).exec();
    if (!user) {
        throw new ApiError_1.ApiError(404, 'User not found');
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, { courses: user.createdCourses }, "Created courses fetched successfully"));
}));
exports.uploadLesson = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get courseId 
    //get video file path
    //upload video on cloudinary
    //get the cloudinary url
    //save the lessoon in course
    //return lesson
    var _a;
    const { courseId, lessonName } = req.body;
    const files = req.files;
    const videoPath = (_a = files === null || files === void 0 ? void 0 : files.lessonVideo[0]) === null || _a === void 0 ? void 0 : _a.path;
    if (!courseId || !lessonName || !videoPath) {
        throw new ApiError_1.ApiError(400, 'bad request');
    }
    const cloudinaryRes = yield (0, cloudinary_1.uploadOnCloudinary)(videoPath);
    if (!cloudinaryRes) {
        throw new ApiError_1.ApiError(500, 'error while uploading the video');
    }
    const videoUrl = cloudinaryRes.url;
    const course = yield course_models_1.Course.findById(courseId);
    if (!course) {
        throw new ApiError_1.ApiError(404, 'Course not found');
    }
    course.lessons.push({ lessonName, videoUrl });
    yield course.save();
    return res.status(202).json(new ApiResponse_1.ApiResponse(202, { videoUrl }, 'lesson uploaded successfully'));
}));
