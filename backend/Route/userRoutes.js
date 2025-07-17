const express = require("express");
const {
  SignupUser,
  LoginUser,
  AllUsersDetail,
  addToCart,
  deleteFromCart,
  getCart,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  placeOrder,
  getOrdersByDate
} = require("../Controller/userController");

const router = express.Router();

router.post("/signup", SignupUser);
router.post("/login", LoginUser);

router.get("/allUser", AllUsersDetail);
router.post("/getCart", getCart);
router.post("/addToCart", addToCart);
router.post("/deleteFromCart", deleteFromCart);
router.post("/addToWishlist", addToWishlist);
router.post("/removeFromWishlist", removeFromWishlist);
router.get("/getWishlist", getWishlist);
router.post("/placeorder", placeOrder);
router.get("/getOrder", getOrdersByDate);


module.exports = router;
