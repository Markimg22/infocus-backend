"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            errros: 'Usuário não autorizado',
        });
    }
    var token = authorization.replace('Bearer', '').trim();
    try {
        var data = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        var id = data.id;
        req.userId = id;
        return next();
    }
    catch (e) {
        return res.status(401).json({
            errros: e.message,
        });
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map