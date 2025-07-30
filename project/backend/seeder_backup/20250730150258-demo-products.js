'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products',[
    {
     id: 1,
     name: 'product1',
     profile_path: './public/image/product1',
     measure: 'kg',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
     id: 2,
     name: 'product2',
     profile_path: './public/image/product2',
     measure: 'litter',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
     id: 3,
     name: 'product3',
     profile_path: './public/image/product4',
     measure: 'ton',
    createdAt: new Date(),
    updatedAt: new Date()
    },

  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products',null,{});
  }
};

