module.exports = function (sequelize,Sequelize) {
    return sequelize.define('user_roles', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(255)
        },
        created_at: {
            type: Sequelize.DATE,
        },
        updated_at: {
            type: Sequelize.DATE,
        }
    }, {
        timestamps: false
    });
}
