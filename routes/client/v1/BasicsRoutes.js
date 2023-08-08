/**
 * BasicsRoutes.js
 * @description :: CRUD API routes for Basics
 */

const express = require('express');
const router = express.Router();
const BasicsController = require('../../../controller/client/v1/BasicsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/basics/create').post(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.addBasics);
router.route('/client/api/v1/basics/list').post(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.findAllBasics);
router.route('/client/api/v1/basics/count').post(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.getBasicsCount);
router.route('/client/api/v1/basics/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.getBasics);
router.route('/client/api/v1/basics/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.updateBasics);    
router.route('/client/api/v1/basics/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.partialUpdateBasics);
router.route('/client/api/v1/basics/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.softDeleteBasics);
router.route('/client/api/v1/basics/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.softDeleteManyBasics);
router.route('/client/api/v1/basics/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.bulkInsertBasics);
router.route('/client/api/v1/basics/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.bulkUpdateBasics);
router.route('/client/api/v1/basics/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.deleteBasics);
router.route('/client/api/v1/basics/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,BasicsController.deleteManyBasics);

module.exports = router;
