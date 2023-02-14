const User = require('../models/user.m')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class userController{
      //[GET]: /login
    ShowPagelogin(req, res, next){
        res.render('user/login');
    }

    //[GET]: /register
    ShowPageRegister(req, res, next){
        res.render('user/register');
    }
    //[POST]: /login
    async login(req, res, next){
        const {username , password, time} = req.body;
        const user = await User.getUserByName(username);
        if(!user){
            return res.json({ success: false, message: "Username not found"})
        }
        
        const validPassword = await bcrypt.compare(password, user.Password);
        if(!validPassword){
            return res.json({ success: false, message: "Username or password not true"})
        }

        jwt.sign({ id: user.UserID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time * 1000 }, (err, token) => {
            res.cookie("jwt", token, { maxAge: time * 1000, httpOnly: true });
            return res.json({success: true, accessToken: token})
        });
    }

    //[POST]: /register
    async register(req, res, next){
        const {username, password, fullName, address} = req.body;
        const existsUsername = await User.getUserByName(username);
        if(existsUsername){
            // errors.push({message: "User already registered"})
            // return res.render('user/register', {errors, username, password, confirmPassword});
            return res.json({success: false, message: "User already registered"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const number = await User.getMaxID();

        const accessToken = jwt.sign({ userId:number + 1 }, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.addUser({
            uid: number.max + 1,
            username,
            password: hashedPassword,
            fullName,
            address,
            token: accessToken
        })

        const cus = await User.addCustomer({
            id: number.max + 1,
            customerName: username,
            token: accessToken,
        })
        return res.json({success: true, user, message: "Register succesfully"})
    }

    //[GET]: /logout
    logout(req, res, next){
        res.cookie('jwt', '', { maxAge: 1 });
        return res.redirect('http://localhost:3113/login')
    }
}

module.exports = new userController();