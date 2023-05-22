const router = require('express').Router();
const { Model } = require('sequelize');
const { User, Recipes, Images } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    const recipeData = await Recipes.findAll({
      include: [
        {
          model: Images,
          attributes: ['filePath']
        }
      ]
    });

    const recipeArr = recipeData.map(recipeData => recipeData.toJSON());
    console.log("-------------------------RECIPE ARRAY -------------------------")
    console.log(recipeArr)
    res.render('homepage', {recipeArr})

  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/upload', async (req, res) => {
  res.render('upload');
})

// Dashboard specific to the user logged in
router.get('/dashboard', async (req, res) => {
  try {

    const recipeData = await Recipes.findAll({
      where: {
        author_id: req.session.user_id
      },
      include: [
        {
          model: Images,
          attributes: ['filePath']
        }
      ]
    });

    const recipeArr = recipeData.map(recipeData => recipeData.toJSON());
    console.log("-------------------------RECIPE ARRAY -------------------------")
    console.log(recipeArr)
    res.render('dashboard', {recipeArr})

  } catch (err) {
    res.status(500).json(err)
  }
});

// Single recipe page
router.get('/single-recipe-page-view/:id', async (req, res) => {

  const recipeId = req.params.id;

  
  try {
    
    console.log("Param ID: ",req.params.id);

    const recipeData = await Recipes.findByPk(req.params.id);
    const recipe = recipeData.toJSON();

    console.log(recipe);

    res.render('singleRecipePage', recipe)

  } catch (err) {
    res.status(500).json(err)
  }

});

module.exports = router;
