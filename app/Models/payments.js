module.exports = function (sequelize,Sequelize) {
    return sequelize.define('payments', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING,
        },
        product_id: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        parts_count: {
            type: Sequelize.INTEGER
        },
        last_part: {
            type: Sequelize.INTEGER
        },
        start_date: {
            type: Sequelize.DATE
        },
        days_left: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });
}
