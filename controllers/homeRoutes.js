const router = require('express').Router();
const { Model } = require('sequelize');
const { User, Recipes, Images } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['fname', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
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

router.get('/recipes', async (req, res) => {
  try {


    const recipeData = await Recipes.findAll({
      include: [
        {
          model: Images,
          attributes: ['filePath']
        }
      ]
    })

    
    const recipeArr = recipeData.map(recipeData => recipeData.toJSON());
    console.log("-------------------------RECIPE ARRAY -------------------------")
    console.log(recipeArr)
    res.render('allRecipes', {recipeArr})


  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router;
