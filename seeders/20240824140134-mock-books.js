'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Books', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Books', [
      {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
        createdAt: new Date(),
      },
      {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1,
        createdAt: new Date(),
      },
      {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1,
        createdAt: new Date(),
      },
      {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1,
        createdAt: new Date(),
      },
      {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1,
        createdAt: new Date(),
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {});
  }
};
