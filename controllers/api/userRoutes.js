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

  // req.session.save(() => {
  //   // do I also need to recreate the user id here as well?
  //   req.session.recipe_id = newRecipe.id
  // })

  // console.log(req.session.recipe_id);
  res.json(newRecipe);

  // get the id of the newly created recipe, and store that into the session storage for the upload page

})

router.post('/multiple', upload.array('profile-files', 12), async function (req, res, next) {
  console.log("POST request for multiple files hit!")

  try {
    // console.log(req.files);
    // console.log(req.files[0].filename);
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

      console.log(newImage)
    }
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }

})

module.exports = router;

    // const newImage = await Images.create({

    // })



    // for (var i = 0; i < req.files.length; i++) {
    //   // response += `<img class="image-upload" src="/${req.files[i].path}" /><br>`
    //   // return res.send(response)

    // }

    // // req.files is array of `profile-files` files
    // // req.body will contain the text fields, if there were any
    // var response = '<a href="/">Home</a><br>'
    // response += "Files uploaded successfully.<br>"
    // for (var i = 0; i < req.files.length; i++) {
    //   response += `<img class="image-upload" src="/${req.files[i].path}" /><br>`
    //   return res.send(response)
    // }

