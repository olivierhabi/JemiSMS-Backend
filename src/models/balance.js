"use strict";
module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define(
    "Balance",
    {
      balance: DataTypes.INTEGER
    },
    {}
  );
  Balance.associate = models => {
    // associations can be defined here
    Balance.belongsTo(models.User, {
      foreignKey: "userId",
      as: "owner"
    });
  };
  return Balance;
};
