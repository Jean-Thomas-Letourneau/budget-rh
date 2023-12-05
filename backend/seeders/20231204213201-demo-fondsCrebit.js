module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FondsCredits', [
      { nom: 'Project X', type: 'Grant', montant: 20000.00, anneeFiscale: 2023, description: 'Funding for Project X', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Project Y', type: 'Sponsorship', montant: 15000.00, anneeFiscale: 2023, description: 'Funding for Project Y', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FondsCredits', null, {});
  }
};
