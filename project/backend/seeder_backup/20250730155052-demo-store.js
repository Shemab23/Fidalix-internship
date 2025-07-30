'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("stores",[
    {
      shop_id: 2,
      product_id: 1,
      price: 450,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      shop_id: 2,
      product_id: 2,
      price: 400,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      shop_id: 2,
      product_id: 3,
      price: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stores',null,{});
  }
};
