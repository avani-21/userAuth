const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const userSchema = require("../model/usermodel");

const loadLogin = async (req, res) => {
  res.render("admin/login");
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin)
      return res.render("admin/login", { message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return res.render("admin/login", { message: "Inavalid credentials" });

    req.session.admin = true;

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
  }
};

const loadDashbord = async (req, res) => {
  try {
    const admin = req.session.admin;
    if (!admin) return res.redirect("/admin/login");

    const users = await userSchema.find({});

    res.render("admin/dashboard", { users });
    const user = await userSchema.find({});
  } catch (error) {
    console.error(error);
  }
};

const editUser = async (req, res) => {
  try {
    const { id, email, password } = req.body;

    const user = await userSchema.find({ _id: id });
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      hashedPassword = user.password;
    }

    await userSchema.findOneAndUpdate(
      { _id: id },
      { $set: { email, password: hashedPassword } }
    );
    //console.log(password)

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    
    
    const { id } = req.params;
    console.log(id);
    const user = await userSchema.findOneAndDelete({_id:id});

    res.redirect("/admin/dashboard");
  } catch (error) {}
};

const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
  }
}


const logOut= async (req,res)=>{
    req.session.destroy();
    res.redirect('/admin/login')
}


const search =async(req,res)=>{    
   try{
    const search = req.query.q;
    const users = await userSchema.find({
        email: {$regex: search, $options: "i" }
      });
  res.render("admin/dashboard",{users})
   }catch(error){
    console.log(error);
   }
}


module.exports = {
  loadLogin,
  adminLogin,
  loadDashbord,
  editUser,
  deleteUser,
  addUser,
  logOut,
  search,
};
