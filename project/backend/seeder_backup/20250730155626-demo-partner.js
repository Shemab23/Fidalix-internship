'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("partners",[
    {
      id: 1,
      path: './publi/image/partner1',
      name: 'partner1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      path: './publi/image/partner2',
      name: 'partner2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      path: './publi/image/partner3',
      name: 'partner3',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]
  )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('partners',null,{});
  }
};
