const userDBA=require('../mongodb/models/user');
const department=require('../mongodb/models/department');
const passwordUtil=require('../utils/password');
const responseHandler=require('../utils/responsehandler');

exports.getUserDetails=async (req,res)=>{
    try{
            const userId=req.params.id;
            const userDBAResponse=await userDBA.findById(userId, {password:0})
            responseHandler.successResponse(req,res,userDBAResponse);
         }
    catch(err){
            console.log(err);
            responseHandler.errorResponse(req,res,err,500);
    }
}

exports.getUserInfo=async(req, res) => {
    try{
        const departmentName=req.params.departmentName;
        const userDBAResponse=await userDBA.find({department: departmentName}, {password:0})
        responseHandler.successResponse(req,res,userDBAResponse);
     }
catch(err){
        console.log(err);
        responseHandler.errorResponse(req,res,err,500);
}
}


// exports.updateUser=(req,res)=>{
//     const userId=req.body.id;
//     const userPayload=req.body;
//     delete userPayload.id;
//     return userDBA.update({"id":userId},userPayload)
//         .then(userDBAResponse=>{
//             console.log(userDBAResponse);
//             responseHandler.successResponse(req,res,userDBAResponse);
//         })
//         .catch(err=>{
//             console.log(err);
//             responseHandler.errorResponse(req,res,err,500);
//         })
// }


exports.createUser=(req,res)=>{
    const user=req.body;
    delete user.id;
    return userDBA.findOne({'emailId':user.emailId})
    .then(uniqueEmailRespose=>{
        if(uniqueEmailRespose){
            responseHandler.errorResponse(req,res,"Email Id is already taken",500);
        } else{
            return passwordUtil.encryptPassword(user.password)
            .then(response=>{
                user.password=response;
            })
            .then(()=>{
                return userDBA.create(user)
            })
            .then(userDBAResponse=>{
                console.log(userDBAResponse);
                responseHandler.successResponse(req,res,userDBAResponse);
            })
        }
    })
    .catch(err=>{
        console.log(err); 
        responseHandler.errorResponse(req,res,err,500);
    })
}

// exports.enumerateUsers=async (req,res)=>{
//     try{
//         const userDBAResponse= await userDBA.find({},{password:0}).populate('department').exec()
//             responseHandler.successResponse(req,res,userDBAResponse);
//     }
//      catch(err){
//             console.log(err);
//             responseHandler.errorResponse(req,res,err,500);
//     }
// }


// exports.removeUser=(req,res)=>{
//     const userId=req.params.id;
//     userDBA.deleteOne({_id:userId})
//     .then(deleteResponse=>{
//         responseHandler.successResponse(req,res,deleteResponse);
//     })
//     .catch(err=>{
//         console.log(err);
//         responseHandler.errorResponse(req,res,err,500);
//     })
// }