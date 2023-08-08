/**
 * BasicsRoutes.js
 * @description :: CRUD API routes for Basics
 */

const express = require('express');
const router = express.Router();
const BasicsController = require('../../../controller/device/v1/BasicsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/basics/create').post(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.addBasics);
router.route('/device/api/v1/basics/list').post(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.findAllBasics);
router.route('/device/api/v1/basics/count').post(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.getBasicsCount);
router.route('/device/api/v1/basics/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.getBasics);
router.route('/device/api/v1/basics/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.updateBasics);    
router.route('/device/api/v1/basics/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.partialUpdateBasics);
router.route('/device/api/v1/basics/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.softDeleteBasics);
router.route('/device/api/v1/basics/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.softDeleteManyBasics);
router.route('/device/api/v1/basics/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.bulkInsertBasics);
router.route('/device/api/v1/basics/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.bulkUpdateBasics);
router.route('/device/api/v1/basics/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.deleteBasics);
router.route('/device/api/v1/basics/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,BasicsController.deleteManyBasics);

module.exports = router;
