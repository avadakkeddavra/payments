let fs = require('file-system');
let path = require('path');
let Sequelize = require("sequelize");
let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
let db = {};


fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));

        db[model.name] = model;
    });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.users.sync();
// db.user_roles.sync();
// db.payments.sync();


db.users.belongsTo(db.user_roles, {foreignKey: 'role_id'});
//db.users.hasMany(db.payments, {foreignKey: 'user_id'});

module.exports = db;