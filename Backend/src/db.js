const { Sequelize } = require("sequelize");
const userModel = require("./models/user");
const requirementModel = require("./models/requirement");

// const DB_USER = "postgres";
// const DB_PASSWORD = "rootWilson";
// const DB_HOST = "localhost";
// const DB_NAME = "pi";

const sequelize = new Sequelize(
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pi`,
  `postgres://postgres:rootWilson@localhost/expert-requeriments`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
userModel(sequelize);
requirementModel(sequelize);

const { User, Requirement } = sequelize.models;

User.belongsToMany(Requirement, { through: "UserXRequirement" });
Requirement.belongsToMany(User, { through: "UserXRequirement" });

// const { User } = sequelize.models;

// console.log(Object.keys(User));

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
