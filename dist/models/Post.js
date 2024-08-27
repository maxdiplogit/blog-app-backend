"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "author for post required"],
    },
    postTitle: {
        type: String,
        required: [true, "postTitle is required"],
    },
    postContent: {
        type: String,
    }
});
const PostModel = mongoose_1.default.model("Post", PostSchema);
exports.default = PostModel;
