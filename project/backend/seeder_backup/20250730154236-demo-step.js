'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('steps',[
    {
      id: 1,
      path: './public/image/blog1',
      title: 'blog title 1',
      description: 'description for blog 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      path: './public/image/blog2',
      title: 'blog title 2',
      description: 'description for blog 2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      path: './public/image/blog3',
      title: 'blog title 3',
      description: 'description for blog 3',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('steps',null,{});
  }
};

