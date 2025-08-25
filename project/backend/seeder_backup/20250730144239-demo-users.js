'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',[
    {
      id: 1,
      kind: 'customer',
      name: 'customer1',
      location: 'Kigali-Nyarugenge',
      phone: '+250788990000',
      profile_path: './public/image/customer1',
      password: 'customer1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      kind: 'business',
      name: 'business1',
      location: 'Kigali-Nyarugenge',
      phone: '+250777999800',
      profile_path: './public/image/business1',
      password: 'business1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      kind: 'delivery',
      name: 'delivery1',
      location: 'Kigali-Nyarugenge',
      phone: '+250788559800',
      profile_path: './public/image/delivery1',
      password: 'delivery1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',null,{});
  }
};

