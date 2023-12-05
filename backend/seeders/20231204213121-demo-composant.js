module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Composants', [
      { titre: 'Dev', dateDebut: new Date(), dateFin: new Date(), dateAnniv: new Date(), groupe: 'A', niveau: 1, echelon: 'I', bilingue: true, salaire: 50000.00, anneeFiscale: '2023', idEmploye: 1, createdAt: new Date(), updatedAt: new Date() },
      { titre: 'Design', dateDebut: new Date(), dateFin: new Date(), dateAnniv: new Date(), groupe: 'B', niveau: 2, echelon: 'II', bilingue: false, salaire: 45000.00, anneeFiscale: '2023', idEmploye: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Composants', null, {});
  }
};
