const {
    getPosts,
    addPost,
    addSubPost
} = require("./functions/postFunctions")
const logger = require("../logger/loggerConfig")


const getPost = async (req, res) => {
    const userId = req.userId

    try {
        let result = await getPosts(userId, req)
        let posts = result["getPost"]
        let subPosts = result["getSubPost"]
        let postsObj={};
        for(const post of posts){
            postsObj[post.postid]=post;
            post["replies"]=[]
        }
        
        for(const subpost of subPosts){
            postsObj[subpost["postid"]]["replies"].push(subpost);
        }
    
        // send a json response
        res.status(200).json({mssg: "GET posts successful", postsObj})
        // logger.info({ label:'Posts API', message: 'Get posts and subposts', outcome:'success', userId: userId, ipAddress: req.ip })
    } catch (error) {
        res.status(400).json({
            mssg: "Failed to get Post",
            error: error.message
        })
        // logger.error({ label:'Posts API', message: 'Get posts and subposts', outcome:'failed', userId: userId, ipAddress: req.ip, error: error.message })
    }
   
}

const addPosts = async (req, res) => {
    const userId = req.userId
    let { post, dateTime } = req.body 
    try {
        await addPost(userId, post, dateTime, req)
        // send a json response
        res.status(200).json({mssg: "Add posts successful"})
        // logger.info({ label:'Posts API', message: 'Add main posts', outcome:'success', userId: userId, ipAddress: req.ip })
    } catch (error) {
        res.status(400).json({
            mssg: "Failed to Add Post",
            error: error.message
        })
        // logger.error({ label:'Posts API', message: 'Failed to add main post', outcome:'failed', userId: userId, ipAddress: req.ip, error: error.message })
    }    
}

const addSubPosts = async (req, res) => {
    const userId = req.userId
    let { postId, post, dateTime } = req.body 
    try {
        await addSubPost(userId, postId, post, dateTime, req)
        // send a json response
        res.status(200).json({mssg: "Add sub post succesful"})
        // logger.info({ label:'Posts API', message: 'Add sub posts', outcome:'success', userId: userId, ipAddress: req.ip })
    } catch (error) {
        res.status(400).json({
            mssg: "Failed to add sub post",
            error: error.message
        })
        // logger.error({ label:'Posts API', message: 'Failed to add sub post', outcome:'failed', userId: userId, ipAddress: req.ip, error: error.message })
    }    
}




module.exports = {
    getPost,
    addPosts,
    addSubPosts
}