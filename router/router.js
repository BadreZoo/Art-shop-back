const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const userControllers = require('../controllers/userController');
const validate = require('../validation/validator');
const schemaUser = require('../validation/user.shema');
const auth = require("../auth/auth");
const { client } = require("../data/database"); // Importez le client de la base de données



router.post("/signup", validate(schemaUser, 'body'), controller.addNewUser);
router.post("/login", userControllers.login);
router.get("/profile", auth, controller.getYourProfile);
router.get("/products",controller.getAllProducts);
router.get("/product/:productId",controller.getOneProduct);
router.post("/add-to-cart",auth, controller.addProduct);
router.get("/cart",auth,controller.getCartData);
router.delete("/remove-from-cart/:productId", auth, controller.removeProduct);
router.put('/update-quantity/:productId', auth,controller.updateProductQuantity);
router.delete("/clear-cart", auth, controller.clearCart);
router.get("/set-cookie", controller.setCookie);
router.post('/create-checkout-session',controller.createCheckoutSession);


module.exports = router;
