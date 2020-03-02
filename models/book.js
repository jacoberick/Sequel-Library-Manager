"use strict";
const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Book extends Sequelize.Model {}
  Book.init(
    {
      title: {
        type: Sequelize.STRING,
        validate: { notEmpty: true }
      },
      author: {
        type: Sequelize.STRING,
        validate: { notEmpty: true }
      },
      genre: {
        type: Sequelize.STRING,
        validate: { notEmpty: true }
      },
      year: {
        type: Sequelize.INTEGER,
        validate: { notEmpty: true }
      }
    },
    { sequelize }
  );
  return Book;
};
