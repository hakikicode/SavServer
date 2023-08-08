/**
 * BasicsController.js
 * @description :: exports action methods for Basics.
 */

const Basics = require('../../../model/Basics');
const BasicsSchemaKey = require('../../../utils/validation/BasicsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Basics in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Basics. {status, message, data}
 */ 
const addBasics = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      BasicsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdBasics = await dbService.createOne(Basics,dataToCreate);
    return  res.success({ data :createdBasics });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Basics in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Basicss. {status, message, data}
 */
const bulkInsertBasics = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdBasics = await dbService.createMany(Basics,dataToCreate); 
      return  res.success({ data :{ count :createdBasics.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Basics from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Basics(s). {status, message, data}
 */
const findAllBasics = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundBasics;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      BasicsSchemaKey.findFilterKeys,
      Basics.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundBasics = await dbService.count(Basics, query);
      if (!foundBasics) {
        return res.recordNotFound();
      } 
      foundBasics = { totalRecords: foundBasics };
      return res.success({ data :foundBasics });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundBasics = await dbService.paginate( Basics,query,options);
    if (!foundBasics){
      return res.recordNotFound();
    }
    return res.success({ data:foundBasics }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Basics from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Basics. {status, message, data}
 */
const getBasics = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundBasics = await dbService.findOne(Basics,{ id :id });
    if (!foundBasics){
      return res.recordNotFound();
    }
    return  res.success({ data :foundBasics });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Basics.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getBasicsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      BasicsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedBasics = await dbService.count(Basics,where);
    if (!countedBasics){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedBasics } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Basics with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Basics.
 * @return {Object} : updated Basics. {status, message, data}
 */
const updateBasics = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      BasicsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedBasics = await dbService.update(Basics,query,dataToUpdate);
    return  res.success({ data :updatedBasics }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Basics with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Basicss.
 * @return {Object} : updated Basicss. {status, message, data}
 */
const bulkUpdateBasics = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedBasics = await dbService.update(Basics,filter,dataToUpdate);
    if (!updatedBasics){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedBasics.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Basics with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Basics.
 * @return {Object} : updated Basics. {status, message, data}
 */
const partialUpdateBasics = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      BasicsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedBasics = await dbService.update(Basics, query, dataToUpdate);
    if (!updatedBasics) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedBasics });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Basics from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Basics.
 * @return {Object} : deactivated Basics. {status, message, data}
 */
const softDeleteBasics = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Basics, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Basics from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Basics. {status, message, data}
 */
const deleteBasics = async (req, res) => {
  const result = await dbService.deleteByPk(Basics, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Basics in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyBasics = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedBasics = await dbService.destroy(Basics,query);
    return res.success({ data :{ count :deletedBasics.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Basics from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Basics.
 * @return {Object} : number of deactivated documents of Basics. {status, message, data}
 */
const softDeleteManyBasics = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedBasics = await dbService.update(Basics,query,updateBody, options);
    if (!updatedBasics) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedBasics.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addBasics,
  bulkInsertBasics,
  findAllBasics,
  getBasics,
  getBasicsCount,
  updateBasics,
  bulkUpdateBasics,
  partialUpdateBasics,
  softDeleteBasics,
  deleteBasics,
  deleteManyBasics,
  softDeleteManyBasics,
};
