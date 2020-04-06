const userDBA=require('../mongodb/models/user');
const passwordUtil=require('../utils/password');
const jwtTokenUtils=require('../utils/jwttoken');
const responseHandler=require('../utils/responsehandler');

exports.loginUser=(req,res)=>{
    const emailId=req.body.emailId;
    const password=req.body.password;
    let department="";
    let userDetails={};
    return userDBA.findOne({'emailId':emailId})
    .then(userDBAResponse=>{
       department=userDBAResponse.department;
       userDetails={
           id:userDBAResponse.id,
           firstName:userDBAResponse.firstName,
           lastName:userDBAResponse.lastName,
           emailId:userDBAResponse.emailId,
           department: userDBAResponse.department,
           token:'',
           requestedForms:userDBAResponse.requestedForms,
           recievedForms:userDBAResponse.recievedForms,
           departmentForms:userDBAResponse.departmentForms
    };
       return passwordUtil.validatePassowrd(password,userDBAResponse.password);
    })
    .then(passwordVerification=>{
        if(passwordVerification){
            userDetails.token=jwtTokenUtils.generateToken(req,userDetails.id,department);
            res.send(userDetails);
        } else{
            res.send({message:"Invalid EmailId or password"});
        }
    })
    .catch(err=>{
        console.log(err);
        responseHandler.errorResponse(req,res,'Invalid EmailId or password',500);
    })
}
