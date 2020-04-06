const departmentDBA=require('../mongodb/models/department');
const responseHandler=require('../utils/responsehandler');

exports.getDepartmentDetails=(req,res)=>{
    const departmentId=req.params.id;
    return departmentDBA.findById(departmentId)
        .then(departmentDBAResponse=>{
            console.log(departmentDBAResponse);
            res.send(departmentDBAResponse);
        })
        .catch(err=>{
            console.log(err);
            responseHandler.errorResponse(req,res,err,500);
        })
}


exports.updateDepartment=(req,res)=>{
    const departmentId=req.body.id;
    const departmentPayload=req.body;
    delete departmentPayload._id;
    return departmentDBA.update({"id":departmentId},departmentPayload)
        .then(departmentDBAResponse=>{
            console.log(departmentDBAResponse);
            res.send(departmentDBAResponse);
        })
        .catch(err=>{
            console.log(err);
            responseHandler.errorResponse(req,res,err,500);
        })
}


exports.createDepartment=(req,res)=>{
    const department=req.body;
    delete department._id;
    delete department.createdAt;
    delete department.updatedAt;
    return departmentDBA.create(department)
        .then(departmentDBAResponse=>{
            console.log(departmentDBAResponse);
            responseHandler.successResponse(req,res,departmentDBAResponse);
        })
        .catch(err=>{
            console.log(err);
            responseHandler.errorResponse(req,res,'Internal server error',500);
        })
}

exports.enumerateDepartments=(req,res)=>{
    return departmentDBA.find()
        .then(departmentDBAResponse=>{
            console.log(departmentDBAResponse);
            responseHandler.successResponse(req,res,departmentDBAResponse);
        })
        .catch(err=>{
            console.log(err);
            responseHandler.errorResponse(req,res,err,500);
        })
}


exports.removeDepartment=(req,res)=>{
    const departmentId=req.params.id;
    departmentDBA.deleteOne({_id:departmentId})
    .then(deleteResponse=>{
        responseHandler.successResponse(req,res,deleteResponse);
    })
    .catch(err=>{
        console.log(err);
        responseHandler.errorResponse(req,res,err,500);
    })
}