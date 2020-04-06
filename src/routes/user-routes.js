const router = require('express')['Router']();
const userContoller=require('../controllers/user-controller');


// router.get('/',userContoller.enumerateUsers);
router.get('/:id',userContoller.getUserDetails);
router.post('/',userContoller.createUser);
router.get('/department/:departmentName',userContoller.getUserInfo);
// router.put('/',userContoller.updateUser);
// router.delete('/:id',userContoller.removeUser);

module.exports = router;