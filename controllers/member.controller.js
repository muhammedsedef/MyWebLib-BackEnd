const Member = require('../models/Member.model');

const bcrypt = require ('bcrypt');
const saltRounds = 12;

const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator/check');

//GET BACK ALL THE MEMBERS
exports.list = (req,res) => {
    Member.find()
    .then((members) => {
        res.status(200).json({
            status: 200,
            data: members,
            message: 'Success'
        });
    })
    .catch((err) => {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    });
};

//CREATE MEMBER
exports.signup = (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({
            status: 400,
            message: errors.array()
        });
    }else{
    Member.find({email:req.body.email})
    .then((user) => {
         if(user.length >= 1){
            res.status(409).json({   //409 status code for conflict
                status: 409,
                message: "Mail exist!"
            });
         } else{
            bcrypt.hash(req.body.password, saltRounds, (err,hash) => {
                if(err){
                    res.status(400).json({
                        status: 400,
                        message: err.message
                    });
                } else{
                    const member = new Member ({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    });
                    member.save()
                    .then((createdMember) => {
                        res.status(200).json({
                            status: 200,
                            data: createdMember,
                            message: 'Success'
                        });
                    }).catch((err) => {
                        res.status(400).json({
                            status: 400,
                            message: err.message
                        });
                    });
                }
            });
         }
    }).catch((err) => {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    });
    
        
}
};

//GET SPECIFIC ID 
exports.get = (req,res) =>{
    Member.findById(req.params.id)
    .then((member) => {
        res.status(200).json({
            status: 200,
            data: member,
            message: 'Success'
        });
    }).catch((err) => {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    });
};

//UPDATE MEMBER INFORMATION
exports.update = (req,res) =>{
    Member.findById(req.params.id)
    .then((member) => {
        member.firstName = req.body.firstName || member.firstName,
        member.lastName = req.body.lastName || member.lastName,
        member.email = req.body.email || member.email,
        member.save()
        .then((updatedMember) => {
            res.status(200).json({
                status: 200,
                data: updatedMember,
                message: "Success"
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                message: err.message
            });
        });
           
    }).catch((err) => {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    });
};

//DELETE MEMBER
exports.delete = (req,res) =>{
    Member.findByIdAndRemove(req.params.id)
    .then((deletedMember) => {
        res.status(200).json({
            status: 200,
            data: deletedMember,
            message: 'Success'
        });
    }).catch((err) => {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    });
};

//LOGIN MEMBER
exports.login = async (req,res) => {
    await Member.findOne({email: req.body.email }, function (err, member) { 
        if (err){ 
            res.status(400).json({
                status: 400,
                message: err.message
            });
        }else{ 
            if(bcrypt.compareSync(req.body.password, member.password)){
                const token = jwt.sign({
                    memberID: member._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "3h"
                }
                );
                res.status(200).json({
                    status: 200,
                    data: member,
                    message: "Success",
                    token: token
                });
            }else{
            res.status(400).json({
                status: 400,
                message: "Wrong Password!"
            });
        }
        } 
    })
};

//RESET PASSWORD
exports.resetPassword = (req,res) => {
    
    Member.findOne({_id: req.params.id})
    .then((member) => {
        if(bcrypt.compareSync(req.body.oldPassword,member.password)){
           bcrypt.hash(req.body.newPassword,saltRounds, (err,hash) =>{
                if(err){
                    res.status(400).json({
                        status: 400,
                        message: err.message
                    });
                }else{
                    member.password = hash;
                    member.save()
                    .then((result) => {
                        res.status(200).json({
                            status: 200,
                            data: result,
                            message:"Password Successfully Updated"
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({
                            status:400,
                            message: err.message
                        });
                    });
                }
            });
        }else{
            res.status(400).json({
                status: 400,
                message: "Old Password is incorrect!"
            });
        }
    }).catch((err) => {
        console.log("hata");
    });
};

exports.follow = (req,res) => {
    console.log(req.userData);
    //FOLLOW PART
    Member.findOneAndUpdate({_id:req.userData.memberID},
        {$push: {follow:{
                    userID: req.body.id,
                    followDate: new Date()
                }
            }
        },{new:true}
        ).then((result) => {
           console.log(result);
        }).catch((err) => {
            res.status(400).json({
                status: 400,
                message: "follow da hata"
            });
        });    
    

    //FOLLOWERS PART
    Member.findOneAndUpdate({_id:req.body.id},
        {$push: {followers:{
                    userID: req.userData.memberID,
                    followDate: new Date()
                }
            }
        },{new:true}
        ).then((result) => {
            res.status(200).json({
                status: 200,
                data: result,
                message: `You Successfully follow ${result.firstName} ${result.lastName}`
                
            });
        }).catch((err) => {
            res.status(400).json({
                status: 400,
                message: "followers da hata"
            });
        });

}


exports.unFollow = (req,res) => {
    console.log(req.userData);
    //FOLLOW PART
    Member.findOneAndUpdate({_id:req.userData.memberID},
        {$pull: {follow:{
                    userID: req.body.id
                }
            }
        },{new:true}
        ).then((result) => {
           console.log(result);
        }).catch((err) => {
            res.status(400).json({
                status: 400,
                message: "follow da hata"
            });
        });    
    

    //FOLLOWERS PART
    Member.findOneAndUpdate({_id:req.body.id},
        {$pull: {followers:{
                    userID: req.userData.memberID
                }
            }
        },{new:true}
        ).then((result) => {
            res.status(200).json({
                status: 200,
                data: result,
                message: `You Successfully unFollow ${result.firstName} ${result.lastName}`
                
            });
        }).catch((err) => {
            res.status(400).json({
                status: 400,
                message: "followers da hata"
            });
        });

}
    
