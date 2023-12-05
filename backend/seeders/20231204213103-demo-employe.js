module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employes', [
      { nom: 'Doe', prenom: 'John', genre: 'Homme', retraitePartielle: false, retraiteComplete: false, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Smith', prenom: 'Jane', genre: 'Femme', retraitePartielle: true, retraiteComplete: false, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employes', null, {});
  }
};
