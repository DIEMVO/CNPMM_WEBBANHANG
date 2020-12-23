import jwt from "jsonwebtoken";
import config from "./config";

const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    config.JWT_SECRET, //jwt_secret nhu la key de encrypt data va de tao token, nen duoc bao mat
    {
      expiresIn: "30d"
    }
  );
};


const getToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h"
    }
  );
};

//add middle ware to authorization 
const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); //Bo 'Bearer '
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'somethingsecret',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  }
  res.status(401).send({ msg: "Admin Token is not valid" });
};
const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};
const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};

export { getToken, isAuth, isAdmin, generateToken, isSeller, isSellerOrAdmin };
