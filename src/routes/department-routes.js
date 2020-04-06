const router = require('express')['Router']();
const departmentContoller=require('../controllers/department-controller');


router.get('/',departmentContoller.enumerateDepartments);
router.get('/:id',departmentContoller.getDepartmentDetails);
router.post('/',departmentContoller.createDepartment);
router.put('/',departmentContoller.updateDepartment);
router.delete('/:id',departmentContoller.removeDepartment);

module.exports = router;