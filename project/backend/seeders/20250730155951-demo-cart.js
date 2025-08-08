'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("carts",[
    {
      id: 1,
      product_id: 1,
      amount: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      product_id: 2,
      amount: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      product_id: 3,
      amount: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carts',null,{});
  }
};
