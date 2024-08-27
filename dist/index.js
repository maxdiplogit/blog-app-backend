"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Routers
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const postRouter_1 = __importDefault(require("./routers/postRouter"));
// Load environment variables from .env file
dotenv_1.default.config();
// Environment Variables
const PORT = process.env.PORT || "";
const MONGO_DB_URL = process.env.MONGO_DB_URL || "";
const FRONT_URL = process.env.FRONT_URL || "";
// Connecting to MongoDB Database
mongoose_1.default.connect(MONGO_DB_URL)
    .then(() => {
    console.log("MongoDB Connection Success");
})
    .catch((err) => {
    console.log(err.message);
});
// Express Application
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: FRONT_URL,
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Routes
app.use('/auth', authRouter_1.default);
app.use('/post', postRouter_1.default);
app.get("/", (req, res, next) => {
    res.send("Blog App Backend");
});
// Start the server
app.listen(PORT, () => {
    console.log(`Serving running on PORT ${PORT} ...`);
});
