module.exports = function (sequelize,Sequelize) {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(255)
        },
        email: {
            type: Sequelize.STRING(190),
            unique: true 
        },
        password: {
            type: Sequelize.STRING(256),
        },
        role_id: {
            type: Sequelize.TINYINT,
            defaultValue: 3
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
