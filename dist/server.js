"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = require("./routes");
dotenv_1.default.config();
var app = express_1.default();
mongoose_1.default.connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function () { return app.emit('connected'); })
    .catch(function (err) { return console.error(err); });
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(routes_1.router);
app.on('connected', function () {
    app.listen(process.env.PORT || 3333, function () {
        console.log('📦 Successfully connected with database.');
        console.log("\uD83D\uDD25 Server started at " + (process.env.PORT || 3333) + ".");
    });
});
//# sourceMappingURL=server.js.map