"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {}
  );
  Contact.associate = models => {
    // associations can be defined here
    Contact.belongsTo(models.User, {
      foreignKey: "userId",
      as: "owner"
    });
  };
  return Contact;
};
