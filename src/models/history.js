"use strict";
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    "History",
    {
      transaction: DataTypes.STRING,
      customer: DataTypes.STRING,
      amount: DataTypes.STRING,
      smsQuantity: DataTypes.STRING
    },
    {}
  );
  History.associate = models => {
    // associations can be defined here
    History.belongsTo(models.User, {
      foreignKey: "userId",
      as: "owner"
    });
  };
  return History;
};
