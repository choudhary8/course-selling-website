"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const errorHandler = (error, req, res, next) => {
    console.log(error);
    return res.status(error.statusCode || 500).json(new ApiResponse_1.ApiResponse(error.statusCode, {
        error
    }, error.message));
};
exports.errorHandler = errorHandler;
