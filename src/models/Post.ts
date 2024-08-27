import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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


const PostModel = mongoose.model("Post", PostSchema);


export default PostModel;