const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite' // Update the path
});

sequelize.sync({ force: false }).then(() => {
    console.log("Database and tables created!");
});

module.exports = sequelize;
