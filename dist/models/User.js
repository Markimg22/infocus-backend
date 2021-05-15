"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var TaskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    tasks: [TaskSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var UserModel = mongoose_1.model('User', UserSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=User.js.map