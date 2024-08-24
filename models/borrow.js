'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrow.belongsTo(models.Member, { foreignKey: 'memberId' });
      Borrow.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  Borrow.init({
    memberId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    borrowedAt: DataTypes.DATE,
    returnedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Borrow',
  });
  return Borrow;
};