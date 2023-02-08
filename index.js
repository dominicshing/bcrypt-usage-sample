const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const app = express();

// Get json data from request body
app.use(express.json());

dotenv.config();

// Set port number
const PORT = process.env.PORT || 6000;

// Initialize user array, use it to simulate user register and login
const userArray = [];

// Bcrypt method type (short or long)
const passEncrytMethod = { short: 1, long: 0 };

//************************************************************************/

// Routes

// Route 1: Get user route  [GET Request]
app.get('/users', (req, res) => {
  if (userArray.length > 0) {
    res.json(userArray);
  } else {
    res.send('No user registed yet');
  }
});

// Route 2: Register user route  [POST Request]
app.post('/users/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are set
    if (username && password) {
      // Check if username entered is in the userArray
      const isUserExisted = userArray.find(
        (user) => user.username === username
      );

      if (!isUserExisted) {
        let passwordHash;

        /* Method 1: Generating hashed password with bcrypt (longer version) */

        if (passEncrytMethod.long) {
          // Generate salt
          const salt = await bcrypt.genSalt();
          // Hash password with salt
          passwordHash = await bcrypt.hash(password, salt);
          console.log(`salt: ${salt}`);
          console.log(`longer version run`);
        }

        /*  Method 2: Generating hashed password with bcrypt (Shorter version) */

        if (passEncrytMethod.short) {
          // Generate hashed password with salt of rounds 10
          passwordHash = await bcrypt.hash(password, 10);
          console.log(`shorter version run`);
        }

        // Put username and hashed password into user object
        const user = { username: username, password: passwordHash };

        // Add new user object into userArray
        userArray.push(user);

        console.log(`hash pwd: ${passwordHash}`);

        res.status(201).send(`User created: ${user.username}`);
      } else {
        res
          .status(400)
          .send(
            `This username is already registered, please enter another one`
          );
      }
    } else {
      res
        .status(400)
        .send(`Username and password cannot be empty, please try again!`);
    }
  } catch (error) {
    res.status(500).send(`message: ${error.message}`);
  }
});

// Route 3: Login user router [POST Request]
app.post('/users/login', async (req, res) => {
  try {
    // Get username and password form Request body
    const { username, password } = req.body;

    // Check if user and password are set
    if (username && password) {
      // Check if username entered is in the userArray
      const user = userArray.find((user) => user.username === username);

      console.log(`User founded: `, user);

      // Check if user is set
      if (!user) {
        // If user is not set
        res.status(400).send('Cannot find user');
      } else {
        // If user set, check password entrered with bcrypt hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if the passwords match
        if (passwordMatch) {
          // If passwords match
          res.status(200).send('login Successfully');
        } else {
          // If passwords not match
          res
            .status(500)
            .send(
              'login failed, Please check the upsername and password and try again!'
            );
        }
      }
    } else {
      // If username is not found in userArray
      res
        .status(404)
        .send(`Username or password is invalid, please try again!`);
    }
  } catch (error) {
    res.status(500).send(`message: ${error.message}`);
  }
});
``;

// Listen to port
app.listen(PORT, console.log(`Server running on port ${PORT}`));
