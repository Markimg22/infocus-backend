"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var UserController_1 = __importDefault(require("./controllers/UserController"));
var AuthController_1 = __importDefault(require("./controllers/AuthController"));
var TaskController_1 = __importDefault(require("./controllers/TaskController"));
var authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
var router = express_1.Router();
exports.router = router;
/** Users */
router.post('/register', UserController_1.default.store);
router.post('/login', AuthController_1.default.authenticate);
/** Tasks */
router.post('/user/tasks', authMiddleware_1.default, TaskController_1.default.store);
router.get('/user/tasks', authMiddleware_1.default, TaskController_1.default.show);
router.delete('/user/tasks/:id', authMiddleware_1.default, TaskController_1.default.remove);
router.put('/user/tasks/:id', authMiddleware_1.default, TaskController_1.default.update);
//# sourceMappingURL=routes.js.map