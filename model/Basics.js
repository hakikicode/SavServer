/**
 * Basics.js
 * @description :: sequelize model of database table Basics
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Basics = sequelize.define('Basics',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  info:{ type:DataTypes.STRING },
  db:{ type:DataTypes.STRING },
  isActive:{ type:DataTypes.BOOLEAN },
  isDeleted:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Basics,options){
        Basics.isActive = true;
        Basics.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Basics,options){
        if (Basics !== undefined && Basics.length) { 
          for (let index = 0; index < Basics.length; index++) { 
        
            const element = Basics[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Basics.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Basics);
sequelizePaginate.paginate(Basics);
module.exports = Basics;
