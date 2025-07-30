'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('steps',[
    {
      id: 1,
      path: './public/image/step1',
      title: 'step title 1',
      description: 'description for step 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      path: './public/image/step2',
      title: 'step title 2',
      description: 'description for step 2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      path: './public/image/step3',
      title: 'step title 3',
      description: 'description for step 3',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('steps',null,{});
  }
};

