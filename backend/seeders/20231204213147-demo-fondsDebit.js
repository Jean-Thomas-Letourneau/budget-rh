module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FondsDebits', [
      { pourcentage: 5.5, montant: 1000.00, idComposant: 1, createdAt: new Date(), updatedAt: new Date() },
      { pourcentage: 6.0, montant: 1500.00, idComposant: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FondsDebits', null, {});
  }
};
