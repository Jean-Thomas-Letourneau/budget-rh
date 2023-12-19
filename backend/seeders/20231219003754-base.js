'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed Scenario
    await queryInterface.bulkInsert('Scenarios', [
      { anneeFiscale: '2023', nom: 'Scenario 1', description: 'A sample scenario', simulation: false, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // Seed Employes
    await queryInterface.bulkInsert('Employes', [
      {
        nom: 'Doe',
        prenom: 'John',
        genre: 'Homme',
        retraitePartielle: null, // Use null or a valid date
        retraiteComplete: null, // Use null or a valid date
        idScenario: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        selected: true
      },
      {
        nom: 'Smith',
        prenom: 'Jane',
        genre: 'Femme',
        retraitePartielle: new Date(), // Example of setting a valid date
        retraiteComplete: null, // Use null or a valid date
        idScenario: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        selected: true
      }
    ], {});


    // Seed Composants (2 per Employe, assuming Employe IDs 1 and 2)
    await queryInterface.bulkInsert('Composants', [
      { titre: 'Composant 1', dateDebut: new Date(), dateFin: new Date(), groupe: 'A', niveau: 1, echelon: 'I', bilingue: false, salaire: 50000.00, idEmploye: 1, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { titre: 'Composant 2', dateDebut: new Date(), dateFin: new Date(), groupe: 'B', niveau: 2, echelon: 'II', bilingue: true, salaire: 60000.00, idEmploye: 1, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { titre: 'Composant 3', dateDebut: new Date(), dateFin: new Date(), groupe: 'A', niveau: 3, echelon: 'III', bilingue: false, salaire: 70000.00, idEmploye: 2, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { titre: 'Composant 4', dateDebut: new Date(), dateFin: new Date(), groupe: 'B', niveau: 4, echelon: 'IV', bilingue: true, salaire: 80000.00, idEmploye: 2, createdAt: new Date(), updatedAt: new Date(), selected: true }
    ], {});

    // Seed FondsDebit for each Composant (assuming Composant IDs 1 to 4)
    await queryInterface.bulkInsert('FondsDebits', [
      { pourcentage: 10.5, montant: 1000.00, idComposant: 1, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { pourcentage: 12.5, montant: 2000.00, idComposant: 2, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { pourcentage: 14.5, montant: 3000.00, idComposant: 3, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { pourcentage: 16.5, montant: 4000.00, idComposant: 4, createdAt: new Date(), updatedAt: new Date(), selected: true }
    ], {});

    // Seed some Deductions (assuming FondsDebit IDs 1 to 4)
    await queryInterface.bulkInsert('Deductions', [
      { typeDeduction: 'Type 1', nbSemaines: 4, dateDebut: new Date(), dateFin: new Date(), idFondsDebit: 1, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { typeDeduction: 'Type 2', nbSemaines: 5, dateDebut: new Date(), dateFin: new Date(), idFondsDebit: 2, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { typeDeduction: 'Type 3', nbSemaines: 6, dateDebut: new Date(), dateFin: new Date(), idFondsDebit: 3, createdAt: new Date(), updatedAt: new Date(), selected: true },
      { typeDeduction: 'Type 4', nbSemaines: 7, dateDebut: new Date(), dateFin: new Date(), idFondsDebit: 4, createdAt: new Date(), updatedAt: new Date(), selected: true }
    ], {});

    // Seed FondsCredit
    await queryInterface.bulkInsert('FondsCredits', [
      { nom: 'Fonds 1', type: 'Type A', montant: 1500.00, anneeFiscale: 2023, description: 'Fonds Credit Description 1', createdAt: new Date(), updatedAt: new Date(), selected: true },
      { nom: 'Fonds 2', type: 'Type B', montant: 2000.00, anneeFiscale: 2023, description: 'Fonds Credit Description 2', createdAt: new Date(), updatedAt: new Date(), selected: true }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Undo the seeding in reverse order
    await queryInterface.bulkDelete('FondsCredits', null, {});
    await queryInterface.bulkDelete('Deductions', null, {});
    await queryInterface.bulkDelete('FondsDebits', null, {});
    await queryInterface.bulkDelete('Composants', null, {});
    await queryInterface.bulkDelete('Employes', null, {});
    await queryInterface.bulkDelete('Scenarios', null, {});
  }
};
