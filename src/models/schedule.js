"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      uuid: DataTypes.STRING,
      title: DataTypes.STRING,
      phone: DataTypes.STRING,
      sender: DataTypes.STRING,
      message: DataTypes.STRING,
      time: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Schedule.associate = models => {
    // associations can be defined here
    Schedule.belongsTo(models.User, {
      foreignKey: "userId",
      as: "owner"
    });
  };
  return Schedule;
};
