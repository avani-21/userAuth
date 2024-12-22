const userSchema = require("../model/usermodel");
const bcrypt = require("bcrypt");
const saltround = 10;

const registerUser = async (req, res) => {
  try {
    const {username, email, password } = req.body;

    if(username.length<1||password.length<1 || email.length<1) return res,render('user/register',{msg:'All field are required'})
   

    const user = await userSchema.findOne({ email });

    if (user) return res.render("user/login", { msg: "user already exists" });
    const hashedPassword = await bcrypt.hash(password, saltround);

    const newUser = new userSchema({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.render("user/login", { msg: "Registration completed successfully" });
  } catch (error) {
    res.render("user/login", { msgerr: error});
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if(password.lengt<1|| email.length<1) return res.render('user/login',{message:'All fields are required'})

    const user = await userSchema.findOne({ email });
    if (!user)
      return res.render("user/login", { message: "User does not exists" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.render("user/login", { message: "Incorrecct password" });
    req.session.user = true;

    
    res.redirect("/user/home");

  } catch (error) {
    console.error(error);
  }
};

const loadLogin = (req, res) => {
  res.render("user/login");
};

const loadRegister = (req, res) => {
  res.render("user/register");
};

const loadHome = (req, res) => {
  res.render("user/userHome");
};

const logOut = (req, res) => {
  req.session.destroy();
  res.render("user/login");
};

module.exports = {
  registerUser,
  loadLogin,
  loadRegister,
  login,
  loadHome,
  logOut,
};
