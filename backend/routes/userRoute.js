import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { getToken, generateToken, isAuth } from '../util';
import bcrypt from 'bcryptjs';
import userModel from './../models/userModel';
import data from '../data';

const userRouter = express.Router();


userRouter.get('/seed', async (req, res) => {
  const createUsers = await userModel.insertMany(data.users);
  res.send({createUsers});
});

//signin
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email }); //check email co ton tai trong userModel khong
    if (user) { //neu co ton tai user thi check pass
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)  //lay token de authenticate next request, nhung request yeu cau authenticate se dung token, khong can dang nhap lai
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
  

// REGISTER ROUTE
userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

//user detail
userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
//API cho user update
userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password){
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({ //send data len frontend
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    });
  }
}));

// userRouter.get("/createadmin", async (req, res) => {
//     try {
//         const user = new User({
//             name: 'Chopper',
//             email: 'vanspykid85@gmail.com',
//             password: '123456',
//             isAdmin: true
//         });
    
//         const newUser = await user.save();
//         res.send(newUser);
//     } catch (error) {
//         res.send({msg: error.message }); 
//     }  
// });


export default userRouter;