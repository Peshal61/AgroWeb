const User = require("../models/user");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User has already been registered",
      });
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      //creeating new account
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something is not right",
        });
      }
      if (data) {
        return res.status(201).json({
          user: data, //returning user data after user is created
        });
      }
    });
  });
};
