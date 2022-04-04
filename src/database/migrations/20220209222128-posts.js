'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'posts', // nome da tabela
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {model: 'categories', key: 'id'},
          onUpdate: 'CASCADE',

          allowNull: false
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        url_cover: {
          type: Sequelize.STRING,
        },
        is_fake_new: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};
