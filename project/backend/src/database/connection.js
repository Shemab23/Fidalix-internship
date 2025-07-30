import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Fidalix_db_1","root","Inga-bru23",{
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
})


export default sequelize;
