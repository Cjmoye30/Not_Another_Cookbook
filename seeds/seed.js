const sequelize = require('../config/connection');
const { User, Recipes, Images } = require('../models');


const userData = require('./userData.json');
const recipeData = require('./recipeData.json');
const imageData = require('./imageData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- User Table Seeded -----\n');

  await Recipes.bulkCreate(recipeData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Recipes Table Seeded -----\n');

  // Seed comments here
  await Images.bulkCreate(imageData, {
    individualHooks: true,
    returning: true,
  });

  console.log('\n----- Images Table Seeded -----\n');

  process.exit(0);
};

seedDatabase();
