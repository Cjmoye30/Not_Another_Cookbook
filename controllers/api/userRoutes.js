const router = require('express').Router();
const { User, Images, Recipes } = require('../../models');
const multer = require('multer');
const upload = multer({ dest: './uploads' })

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.fname = userData.fname,
        req.session.lname = userData.lname,
        req.session.email = userData.emal,
        req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/create-recipe', async (req, res) => {
  console.log("POST request to create a new recipe hit!");

  // get the req.body
  console.log(req.body);

  // create a new recipe name and desc from the req. body
  const newRecipe = await Recipes.create({
    recipe_name: req.body.recipe_name,
    description: req.body.description,
    author_id: req.session.user_id
  });
  console.log(newRecipe);

  // this logs successfully - need to store it somewhere so I can access it for the rest of this page.
  console.log(newRecipe.id);
  req.session.currRecipeId = newRecipe.id;
  console.log(req.session.currRecipeId);
  console.log(req.session.user_id);
  res.status(200).json(req.body);

});

// upload ingredients
router.put('/upload-ingredients/:id', async (req, res) => {
  console.log("POST request to upload recipe ingredients hit!")
  console.log(req.body);

  try {
    const recipeIng = await Recipes.update(
      {
        ingredients: req.body
      },
      {
        where: {
          id: req.session.currRecipeId
        }
      }
    );

    res.json({
      success: true,
      data: recipeIng,
      message: 'Ingredients added!'
    });

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

// upload instructions
router.put('/upload-instructions/:id', async (req, res) => {
  console.log("POST request to upload recipe instructions hit!")
  console.log(req.body);

  try {
    const recipeIng = await Recipes.update(
      {
        instructions: req.body
      },
      {
        where: {
          id: req.session.currRecipeId
        }
      }
    );

    res.json({
      success: true,
      data: recipeIng,
      message: 'Instructions added!'
    });

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

// Route for image upload
router.post('/multiple', upload.array('profile-files', 12), async function (req, res, next) {
  console.log("POST request for multiple files hit!")

  try {
    const filesObj = req.files;
    console.log(filesObj.length);

    for (let i = 0; i < filesObj.length; i++) {
      console.log(req.files[i].filename);

      // we need to create the row for the recipe so we can get the recipe id, store in the session storage, and then pass that into this object
      const newImage = await Images.create({
        filePath: req.files[i].filename,
        recipe_id: req.session.currRecipeId,
        author_id: req.session.user_id,
      })
      console.log(newImage);
    }

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/single-page-images-upload/:id', upload.array('profile-files', 12), async function (req, res, next) {
  console.log(req.session.currRecipeId)

  try {
    const filesObj = req.files;
    console.log(filesObj.length);

    for (let i = 0; i < filesObj.length; i++) {
      console.log(req.files[i].filename);

      // we need to create the row for the recipe so we can get the recipe id, store in the session storage, and then pass that into this object
      const newImage = await Images.create({
        filePath: req.files[i].filename,
        recipe_id: req.session.currRecipeId,
        author_id: req.session.user_id,
      })
      console.log(newImage);
    }

    res.redirect('back');
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }

});

// delete image from recipe
router.delete('/delete-image/:id', async (req, res) => {

  try {
    const imageData = await Images.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(imageData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }


})

// get details for a single recipe
router.get('single-page-recipe-details/:id', async (req, res) => {

  try {

    const data = await Recipes.findByPk(req.params.id)
    const recipeData = data.toJSON();

    console.log(recipeData);
    res.json(recipeData);

  } catch (err) {
    res.status(500).json(err)
  }

})


module.exports = router;
