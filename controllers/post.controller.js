const Post = require ('../models/Post.model');
const Member = require ('../models/Member.model');

//GET BACK ALL THE POSTS
exports.list = (req, res) => {
    Post.find({})
    .then((posts) => {
        const authorID = [];
        posts.forEach(post => {
            authorID.push(post['authorID']);
        });
       
        Member.find({"_id":{"$in":authorID}},"-password")
        .then((authorInfo) => {
            console.log(authorInfo);
            return res.status(200).json({
                status: 200,
                data: posts,
                authorInfo:authorInfo,
                message: 'Success'
            })
        }).catch((err) => {
            return res.status(400).json({
                status: 400,
                message: err.message
            });
        });
    })
    .catch((err) => {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    })
};

//SUBMIT THE POST
exports.create = (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        authorID: req.userData.memberID,
        type: req.body.type,
        score: req.body.score
    });
    post.save()
        .then((createdPost) => {
            return res.status(200).json({
                status: 200,
                data: createdPost,
                message: 'Success'
            });
        })
        .catch((err) => {
            return res.status(400).json({
                status: 400,
                message: err.message
            });
        });
}

//GET SPECIFIC ID 
exports.get = (req,res) => {
    Post.findById(req.params.id)
    .then((post) => {
        return res.status(200).json({
            status: 200,
            data: post,
            message: 'Success'
        });
    })
    .catch((err) => {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    });
}


//UPDATE POST
exports.update = (req,res) => {
    Post.findById(req.params.id)
    .then((post) => {
       if(post.authorID == req.userData.memberID) {
        post.title = req.body.title || post.title;
        post.description = req.body.description || post.description;
        post.category = req.body.category || post.category;
        post.score = req.body.score || post.score;
        post.lastModified = new Date();
        post.save()
        .then((updatedPost) => {
            return res.status(200).json({
                status: 200,
                data: updatedPost,
                message: 'Success'
            });
        })
        .catch((err) => {
            return res.status(400).json({
                status: 400,
                message: err.message
            });
        });
       }
       else{
            return res.status(400).json({
                status: 400,
                message: "You cannot update that post"
        });
       }
    })
    .catch((err) => {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    });
}
    




    /*
    Post.findById(req.params.id)
    .then((post) => {
        post.title = req.body.title || post.title;
        post.description = req.body.description || post.description;
        post.category = req.body.category || post.category;
        post.lastModified = new Date();
        post.save()
        .then((updatedPost) => {
            return res.status(400).json({
                status: 200,
                data: updatedPost,
                message: 'Success'
            });
        })
        .catch((err) => {
            return res.status(400).json({
                status: 400,
                message: err.message
            });
        });
    })
    .catch((err) => {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    });
}
*/



//DELETE POST
exports.delete = (req,res) => {
    Post.findById(req.params.id)
    .then((post) => {
       if(post.authorID == req.userData.memberID) {
        post.remove()
        .then((removedPost) => {
            return res.status(200).json({
                status: 200,
                data: removedPost,
                message: 'Success'
            });
        })
        .catch((err) => {
            return res.status(400).json({
                status: 400,
                message: err.message
            });
        });
       }
       else{
            return res.status(400).json({
                status: 400,
                message: "You cannot delete that post"
        });
       }
    })
    .catch((err) => {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    });
    
};



