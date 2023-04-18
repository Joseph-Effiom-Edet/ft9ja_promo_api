import express from "express";
import { Protect } from "../models/Protect.js";
import CryptoJS from "crypto-js";
// import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const newAdmin = new Protect({
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    isAdmin: false,
  });

  try {
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Protect.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong Email!!!");

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    const password = decryptedPassword.toString(CryptoJS.enc.Utf8);

    password !== req.body.password && res.status(401).json("Wrong Password!!!");

    // const accessToken = jwt.sign(
    //   {
    //     id: user._id,
    //   },
    //   process.env.JWT_SECRET_KEY,
    //   {}
    // );

    res
      // .cookie("accessToken", accessToken, { httpOnly: true })
      .status(200)
      .json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
