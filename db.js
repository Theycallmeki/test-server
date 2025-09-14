// db.js
const { Sequelize } = require('sequelize');

// Direct connection using your provided credentials
const sequelize = new Sequelize(
  'demo_c2r9', // database name
  'demo_c2r9_user', // username
  'e7GzsodmC6QNSYVHck1y7IgEMPtrvFnp', // password
  {
    host: 'dpg-d2fevp3e5dus73aleol0-a.singapore-postgres.render.com', // external host
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Render requires SSL for external connections
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
