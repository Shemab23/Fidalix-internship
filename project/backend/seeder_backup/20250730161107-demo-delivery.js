'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("deliveries",[
    {
      id: 1,
      status: 'ordered',
      order_id: 1,
      delivery_man_id: 3,
      price: 4000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      status: 'pending',
      order_id: 2,
      delivery_man_id: 3,
      price: 4200,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      status: 'received',
      order_id: 3,
      delivery_man_id: 3,
      price: 4500,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deliveries',null,{});
  }
};
