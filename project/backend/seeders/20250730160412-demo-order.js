'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orders",[
    {
    id: 1,
    owner_id: 1,
    cart_id: 1,
    payment: true,
    bank: 'Bank of Kigali',
    bank_card: 'BK-23334-2233 ',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    id: 2,
    owner_id: 2,
    cart_id: 2,
    payment: false,
    bank: 'equity',
    bank_card: 'EQ-23554-2233 ',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    id: 3,
    owner_id: 3,
    cart_id: 3,
    payment: false,
    bank: 'I&M bank',
    bank_card: 'IM-20054-2233 ',
    createdAt: new Date(),
    updatedAt: new Date()
    }
  ]
  )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders',null,{});
  }
};
