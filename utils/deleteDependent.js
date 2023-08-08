/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Basics = require('../model/Basics');
let User = require('../model/user');
let Category = require('../model/category');
let Task = require('../model/task');
let Tag = require('../model/tag');
let Task_tag = require('../model/task_tag');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBasics = async (filter) =>{
  try {
    let response  = await dbService.destroy(Basics,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const BasicsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const BasicsCnt = await dbService.destroy(Basics,BasicsFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt = await dbService.destroy(Category,categoryFilter);

      const taskFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const taskCnt = await dbService.destroy(Task,taskFilter);

      const tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tagCnt = await dbService.destroy(Tag,tagFilter);

      const task_tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const task_tagCnt = await dbService.destroy(Task_tag,task_tagFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        Basics :BasicsCnt.length,
        user :userCnt.length + deleted.length,
        category :categoryCnt.length,
        task :taskCnt.length,
        tag :tagCnt.length,
        task_tag :task_tagCnt.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategory = async (filter) =>{
  try {
    let category = await dbService.findAll(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const categoryFilter = { $or: [{ parentId : { $in : category } }] };
      const categoryCnt = await dbService.destroy(Category,categoryFilter);

      const taskFilter = { $or: [{ categoryId : { $in : category } }] };
      const taskCnt = await dbService.destroy(Task,taskFilter);

      let deleted  = await dbService.destroy(Category,filter);
      let response = {
        category :categoryCnt.length + deleted.length,
        task :taskCnt.length,
      };
      return response; 
    } else {
      return {  category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTask = async (filter) =>{
  try {
    let task = await dbService.findAll(Task,filter);
    if (task && task.length){
      task = task.map((obj) => obj.id);

      const taskFilter = { $or: [{ parentId : { $in : task } }] };
      const taskCnt = await dbService.destroy(Task,taskFilter);

      const task_tagFilter = { $or: [{ taskId : { $in : task } }] };
      const task_tagCnt = await dbService.destroy(Task_tag,task_tagFilter);

      let deleted  = await dbService.destroy(Task,filter);
      let response = {
        task :taskCnt.length + deleted.length,
        task_tag :task_tagCnt.length,
      };
      return response; 
    } else {
      return {  task : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTag = async (filter) =>{
  try {
    let tag = await dbService.findAll(Tag,filter);
    if (tag && tag.length){
      tag = tag.map((obj) => obj.id);

      const task_tagFilter = { $or: [{ tagId : { $in : tag } }] };
      const task_tagCnt = await dbService.destroy(Task_tag,task_tagFilter);

      let deleted  = await dbService.destroy(Tag,filter);
      let response = { task_tag :task_tagCnt.length, };
      return response; 
    } else {
      return {  tag : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTask_tag = async (filter) =>{
  try {
    let response  = await dbService.destroy(Task_tag,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countBasics = async (filter) =>{
  try {
    const BasicsCnt =  await dbService.count(Basics,filter);
    return { Basics : BasicsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const BasicsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const BasicsCnt =  await dbService.count(Basics,BasicsFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      const taskFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const taskCnt =  await dbService.count(Task,taskFilter);

      const tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tagCnt =  await dbService.count(Tag,tagFilter);

      const task_tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        Basics : BasicsCnt,
        user : userCnt,
        category : categoryCnt,
        task : taskCnt,
        tag : tagCnt,
        task_tag : task_tagCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategory = async (filter) =>{
  try {
    let category = await dbService.findAll(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const categoryFilter = { $or: [{ parentId : { $in : category } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      const taskFilter = { $or: [{ categoryId : { $in : category } }] };
      const taskCnt =  await dbService.count(Task,taskFilter);

      let response = {
        category : categoryCnt,
        task : taskCnt,
      };
      return response; 
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTask = async (filter) =>{
  try {
    let task = await dbService.findAll(Task,filter);
    if (task && task.length){
      task = task.map((obj) => obj.id);

      const taskFilter = { $or: [{ parentId : { $in : task } }] };
      const taskCnt =  await dbService.count(Task,taskFilter);

      const task_tagFilter = { $or: [{ taskId : { $in : task } }] };
      const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

      let response = {
        task : taskCnt,
        task_tag : task_tagCnt,
      };
      return response; 
    } else {
      return {  task : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTag = async (filter) =>{
  try {
    let tag = await dbService.findAll(Tag,filter);
    if (tag && tag.length){
      tag = tag.map((obj) => obj.id);

      const task_tagFilter = { $or: [{ tagId : { $in : tag } }] };
      const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

      let response = { task_tag : task_tagCnt, };
      return response; 
    } else {
      return {  tag : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTask_tag = async (filter) =>{
  try {
    const task_tagCnt =  await dbService.count(Task_tag,filter);
    return { task_tag : task_tagCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBasics = async (filter,updateBody) =>{  
  try {
    const BasicsCnt =  await dbService.update(Basics,filter);
    return { Basics : BasicsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const BasicsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const BasicsCnt = await dbService.update(Basics,BasicsFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const categoryCnt = await dbService.update(Category,categoryFilter,updateBody);

      const taskFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const taskCnt = await dbService.update(Task,taskFilter,updateBody);

      const tagFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const tagCnt = await dbService.update(Tag,tagFilter,updateBody);

      const task_tagFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        Basics :BasicsCnt.length,
        user :userCnt.length + updated.length,
        category :categoryCnt.length,
        task :taskCnt.length,
        tag :tagCnt.length,
        task_tag :task_tagCnt.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategory = async (filter,updateBody) =>{  
  try {
    let category = await dbService.findAll(Category,filter, { id:1 });
    if (category.length){
      category = category.map((obj) => obj.id);

      const categoryFilter = { '$or': [{ parentId : { '$in' : category } }] };
      const categoryCnt = await dbService.update(Category,categoryFilter,updateBody);

      const taskFilter = { '$or': [{ categoryId : { '$in' : category } }] };
      const taskCnt = await dbService.update(Task,taskFilter,updateBody);
      let updated = await dbService.update(Category,filter,updateBody);

      let response = {
        category :categoryCnt.length + updated.length,
        task :taskCnt.length,
      };
      return response;
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTask = async (filter,updateBody) =>{  
  try {
    let task = await dbService.findAll(Task,filter, { id:1 });
    if (task.length){
      task = task.map((obj) => obj.id);

      const taskFilter = { '$or': [{ parentId : { '$in' : task } }] };
      const taskCnt = await dbService.update(Task,taskFilter,updateBody);

      const task_tagFilter = { '$or': [{ taskId : { '$in' : task } }] };
      const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);
      let updated = await dbService.update(Task,filter,updateBody);

      let response = {
        task :taskCnt.length + updated.length,
        task_tag :task_tagCnt.length,
      };
      return response;
    } else {
      return {  task : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTag = async (filter,updateBody) =>{  
  try {
    let tag = await dbService.findAll(Tag,filter, { id:1 });
    if (tag.length){
      tag = tag.map((obj) => obj.id);

      const task_tagFilter = { '$or': [{ tagId : { '$in' : tag } }] };
      const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);
      let updated = await dbService.update(Tag,filter,updateBody);

      let response = { task_tag :task_tagCnt.length, };
      return response;
    } else {
      return {  tag : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTask_tag = async (filter,updateBody) =>{  
  try {
    const task_tagCnt =  await dbService.update(Task_tag,filter);
    return { task_tag : task_tagCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBasics,
  deleteUser,
  deleteCategory,
  deleteTask,
  deleteTag,
  deleteTask_tag,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBasics,
  countUser,
  countCategory,
  countTask,
  countTag,
  countTask_tag,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBasics,
  softDeleteUser,
  softDeleteCategory,
  softDeleteTask,
  softDeleteTag,
  softDeleteTask_tag,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
