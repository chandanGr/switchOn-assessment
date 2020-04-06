const userRoutes=require("./user-routes");
const authRoutes=require("./auth-routes");
const departmentRoutes=require('./department-routes');
const formRoutes=require('./form-routes');
module.exports = (app) => {
    app.use('/user',userRoutes);
    app.use('/auth',authRoutes);
    app.use('/form',formRoutes);
    app.use('/department',departmentRoutes);
};

