'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.hasMany(models.Borrow, { foreignKey: 'memberId' });
    }
  }
  Member.init({
    name: DataTypes.STRING,
    penalized: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};