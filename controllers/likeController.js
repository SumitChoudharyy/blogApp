
// import Models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// Like a Post
exports.likePost = async (req,res) => {
    try{
        const {post,user} = req.body;
        const like = new Like({
            post, user,
        });

        const savedLike = await like.save();
        
        // Update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id} }, {new: true})
                            .populate("likes").exec();
        res.json({
            post:updatedPost,
        });

    }catch(error){
        return res.status(400).json({
            error:"Error while fetching post", 
        })
    }
}

// Unlike the post
//Unlike a post
exports.unlikePost = async (req,res) => {

    try{
        const{post, like} = req.body;
        //find and delete the like collection me se
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

        //udpate the post collection
        const udpatedPost = await Post.findByIdAndUpdate(post,
                                                        {$pull: {likes: deletedLike._id} }, 
                                                        {new: true});

        res.json({
            post:udpatedPost,
        });

    }
    catch(error) {
        return res.status(400).json({
            error: "Error while Unliking post",
        });
    }

}


exports.dummyLink = (req,res) => {
    res.send("This is Your Dummy Link");
};