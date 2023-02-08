# Bcrypt Usage Sample
A simple demo with login and signup routes to record the basic bcrypt package usage in password encryption during user registration and login

## Setup and Install all Packages for this Sample
```
npm install
```
and rename **.sample.env** file to **.env**


### If Install Packages for New Project, then...
- Basic package
```js
npm install express donenv
```

and modemon for development
```js
npm install nodemon --save-dev
```

- Install bcrypt package
```js
npm install bcrypt
```

## Routes Included

This usage sample apply REST Client Extension for sending requests, open **request.rest** file to send corresponding requests for testing


- Get all users API
```
GET http://localhost:5000/users
```

- Register new user API
```
POST http://localhost:5000/users/register
```

- Login user API
```
POST http://localhost:5000/users/login
```

## User Data Stored

- All user data will stored in **userArray** in this sample
```js
const userArray = [];
```

- New user registered will be added to this array. When user login, it will match with this array for correct crediential as well.  

Below is the sample of the **userArray**:
```json
[
  {
    "username": "Dominic",
    "password": "$2b$10$/iS.1u7uUdk8l6bzwob2PODcd7H/OH5BINB1FKWWvTPkSlxmvGcWu"
  },
  {
    "username": "Tommy",
    "password": "$2b$10$TjmiC7srw3eg1Y86a1xSROpqDlRjr1724sggC4jugHUwZ9t2nMJa."
  }
]
```

## User Registration: Use Bcryt for Password Encyption

### Generate hashed password with salt

- Longer Verion
```js
// Generate salt
const salt = await bcrypt.genSalt();
  
// Hash password with salt
passwordHash = await bcrypt.hash(password, salt);
```

- Shorter Version
```js
// Generate hashed password with salt of rounds 10
passwordHash = await bcrypt.hash(password, 10);
```

### The Generated Hashed Password will Look Like:
```
$2b$10$/iS.1u7uUdk8l6bzwob2PODcd7H/OH5BINB1FKWWvTPkSlxmvGcWu
```

## User Login: Compare User Entered Password with Hashed Password
-  **bcrypt.compare(pwdToCheck, hashedPwd)** will return **true** if the password matches, **false** otherwises.
```js
// If user set, check password entrered with bcrypt hashed password
 const passwordMatch = await bcrypt.compare(password, user.password);
 ```

- Check if the passwords are match or not after running **bcrypt.compare()**
 ```js
// Check if the passwords match
if (passwordMatch) {
  // If passwords match
  res.status(200).send('login Successfully');
} else {
  // If passwords not match
  res
    .status(500)
    .send(
      'login failed, Please check the username and password and try again!'
    );
}
 ```
 
