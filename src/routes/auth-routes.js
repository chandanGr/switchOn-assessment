const router = require('express')['Router']();
const productController=require('../controllers/auth-controller');

router.post('/',productController.loginUser);

module.exports = router;