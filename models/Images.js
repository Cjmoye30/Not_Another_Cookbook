const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Recipes = require('./Recipes');
const User = require('./User');

class Images extends Model { }

Images.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        filePath: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // Foreign key
        recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Recipes,
                key: 'id'
            }
        },

        // Foreign key
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'images',
    }
);

module.exports = Images;

// create a new image object on button submit which takes in the user_id and the filepath