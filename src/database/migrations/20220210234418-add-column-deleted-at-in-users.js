'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users', 
      'deleted_at',
      { type: Sequelize.DATE }
      );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
