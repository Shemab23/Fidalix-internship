'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("carts",{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'products',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};
