const router = require('express').Router();
const { User } = require('../../models');
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

// router.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {

//   console.log("POST route hit!")

//   try {
//     // req.file is the `profile-file` file
//     // req.body will hold the text fields, if there were any
//     console.log(JSON.stringify(req.file))
//     console.log(req.session.user_id)
//     var response = '<a href="/">Home</a><br>'
//     response += "Files uploaded successfully.<br>"
//     response += `<img src="${req.file.path}" /><br>`
//     return res.send(response)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

router.post('/multiple', upload.array('profile-files', 12), function (req, res, next) {
  console.log("POST request for multiple files hit!")

  try {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for (var i = 0; i < req.files.length; i++) {
      response += `<img class="image-upload" src="/${req.files[i].path}" /><br>`
      return res.send(response)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
