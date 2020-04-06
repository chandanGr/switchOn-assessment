const formDBA=require('../mongodb/models/form');
const userDBA=require('../mongodb/models/user');
const responseHandler=require('../utils/responsehandler');

function updateUsersOfSameDepartment(form){
    return userDBA.updateMany(
    { $and: [ {department: form.assignedToDepartment}, { emailId: {  $ne:  form.assignedTo } } ] },
    {$push:{ 'departmentForms':form}}
    )
    .then(uniqueEmailRespose=>{
            return uniqueEmailRespose;
    })
}

function updateRequestingUser(form){
    return userDBA.updateOne(
    { $and: [ {department: form.createdByDepartment}, { emailId: form.createdBy } ] },
    {$push:{ 'requestedForms':form}}
    )
    .then(uniqueEmailRespose=>{
        return uniqueEmailRespose;
    })
}

function updateRequestedUser(form) {
    return userDBA.updateOne(
    { $and: [ {department: form.assignedToDepartment}, { emailId: form.assignedTo } ] },
    {$push:{ 'recievedForms':form}}
    )
    .then(uniqueEmailRespose=>{
        if(uniqueEmailRespose){
            return uniqueEmailRespose
        }
    })
}


exports.createForm=(req,res)=>{
    const form=req.body;
    // form.id = ObjectId();
    // delete form._id;
    delete form.createdAt;
    delete form.updatedAt;
    form.formId = Date.now();
    return formDBA.create(form)
        .then(formDBAResponse=>{
            console.log(formDBAResponse);
            Object(formDBAResponse._id)
            updateRequestedUser(form)
            updateUsersOfSameDepartment(form);
            updateRequestingUser(form);
            responseHandler.successResponse(req,res,formDBAResponse);
        })
        .catch(err=>{
            console.log(err);
            responseHandler.errorResponse(req,res,'Internal server error',500);
        })
}

function updateFormFromRequestedUser(form){
    return userDBA.update(
        {},
        { $set: { "requestedForms.$[elem].status" : form.status } },
        {multi: true,arrayFilters: [ { "elem.formId": { $eq: form.formId } } ]}
        )
        .then(uniqueEmailRespose=>{
            return uniqueEmailRespose;
        })
}

function updateAllUsersForRecievingUser(form){
    return userDBA.update(
        {},
        { $set: { "departmentForms.$[elem].status" : form.status } },
        {multi: true,arrayFilters: [ { "elem.formId": { $eq: form.formId } } ]}
        )
        .then(uniqueEmailRespose=>{
            return uniqueEmailRespose;
        })
}

exports.updateForm=(req, res) =>{
    const form = req.body;
    delete form.createdAt;
    delete form.updatedAt;
    console.log(form)
    // updateFormFromRequestedUser(form)
    // updateFormFromRecievingUser(form)
    return userDBA.update(
        {},
        { $set: { "recievedForms.$[elem].status" : form.status } },
        {multi: true,arrayFilters: [ { "elem.formId": { $eq: form.formId } } ]}
        )
        .then(uniqueEmailRespose=>{
            console.log(uniqueEmailRespose)
            updateFormFromRequestedUser(form)
            updateAllUsersForRecievingUser(form)
            responseHandler.successResponse(req,res,uniqueEmailRespose  );
        })
}

