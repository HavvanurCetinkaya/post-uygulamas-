const AuthSchema = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await AuthSchema.findOne({email});

    if (user) {
      return res.status(500).json({ msg: "Böyle bir kullanıcı zaten var!" });
    }

    if (password.length < 6) {
      return res
        .status(500)
        .json({ msg: "Şifreniz 6 karakterden küçük olmamalı!" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (!isEmail(email)){
        return res.status(500).json({msg:" Email formatı dışında bir şeyler girdiniz..."})
    }

    const newUser = await AuthSchema.create({username, email, password: passwordHash})

    const token = jwt.sign({id: newUser._id}, "SECRET_KEY", {expiresIn:'1h'})

    res.status(200).json({
        token,
        username: newUser.username,
        email: newUser.email
    }) 

  } catch (error) {
    console.log("Register hatası:", error); 
    return res.status(500).json({msg: error.message})
  }
}

const login = async (req, res) => {
  try {
    const{email, password} = req.body

    if (!isEmail(email)){
        return res.status(500).json({msg:" Email formatı dışında bir şeyler girdiniz..."})
    }

    const user = await AuthSchema.findOne({email})

    if(!user){
        return res.status(500).json({ msg: "Böyle bir kullanıcı bulunamadı!" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare){
        return res.status(500).json({msg: "Girilen şifre yanlıştır!"})
    }

    const token = jwt.sign({id: user._id}, "SECRET_KEY", {expiresIn:'1h'})

    res.status(200).json({
        token,
        username: user.username,
        email: user.email
    }) 

  } catch (error) {
        console.log("Login hatası:", error);
        return res.status(500).json({msg: error.message})

  }
};

function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let rxp = new RegExp(regex).test(emailAdress);
  if (rxp) return true;
  else return false;
}

module.exports = {register, login};
