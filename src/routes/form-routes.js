const router = require('express')['Router']();
const formController=require('../controllers/form-controller');


// router.get('/',formController.enumerateForms);
// router.get('/:id',formController.getFormDetails);
router.post('/',formController.createForm);
router.post('/update',formController.updateForm);
// router.delete('/:id',formController.removeForm);

module.exports = router;