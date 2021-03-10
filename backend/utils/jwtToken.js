// Create and send token and save in the cookie
const sendtoken = (user, statusCode, res) => {
  //create JWT token
  const token = user.getJwtToken();

  //Options for cookie
  const options = {
    expires: new Date(
      //converting to milliseconds
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //imp http cookie cannot be acceessd
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendtoken;
