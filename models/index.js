const User = require('./User');
const Recipes = require('./Recipes');
const Images = require('./Images');

User.hasMany(Recipes, {
    foreignKey: 'author_id'
});

Recipes.belongsTo(User, {
    foreignKey: 'author_id'
});

Recipes.hasMany(Images, {
    foreignKey: 'recipe_id'
});

Images.belongsTo(Recipes, {
    foreignKey: 'recipe_id'
});


module.exports = { User, Recipes, Images };
