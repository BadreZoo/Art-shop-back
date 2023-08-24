
const dataMapper = require('../datamaper/datamaper');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const jwt = require('jsonwebtoken');




const controller={
  addNewUser: async (req, res) => {
    const {
      nom,
      prenom,
      email,
      sex,
      password,
    } = req.body;

    if (!nom || !email || !prenom || !sex || !password) {
      return res.status(400).json({ errorMessage: "Veuillez remplir tous les champs" });
    }

    if (!emailValidator.validate(email)) {
      return res.status(400).json({ errorMessage: "Veuillez entrer une adresse e-mail valide" });
    }

    try {
      const alreadyExistingUser = await dataMapper.getuserFromEmail(email);
      if (alreadyExistingUser) {
        return res.status(400).json({ errorMessage: "Cet e-mail existe déjà" });
      }

      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password, saltRound);

      await dataMapper.createOneUser({
        nom,
        prenom,
        email,
        sex,
        password: hashedPassword,
      });

      const newUser = await dataMapper.getuserFromEmail(email);
      const token = jwt.sign(
        { userId: newUser.id },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );

      return res.status(200).json({ message: "Votre inscription est réussie", token });
    } catch (err) {
      console.error("Erreur lors de l'enregistrement du profil :", err);
      return res.status(500).json({ errorMessage: "L'enregistrement de votre profil n'a pas pu être réalisé. Réessayez ultérieurement" });
    }
  },
  getYourProfile : async (req, res) => {
    // const id = parseInt(req.params.id, 10);
    const id = req.userId;

    try{
      const oneProfile = await dataMapper.getOneProfile(id);
      if(!oneProfile){
        const message = "cette personne n'existe pas. Retournez à la page d'acceuil.";
        return res.status(404).json({message});
      }
      res.json(oneProfile);
    }catch(err){
        console.log(err)
      const message = "Le profil de cette personne n'a pas pû être récupéré. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const getProducts = await dataMapper.AllProducts();
      if (!getProducts || getProducts.length === 0) {
        const message = "Aucun produit trouvé";
        return res.status(404).json({ message });
      }
      res.json(getProducts);
    } catch (err) {
      console.log(err);
      const message = "Impossible de récupérer les produits";
      res.status(500).json({ message, err });
    }
  },
  addProduct: async (req, res) => {
    try {
      const { product_id, quantite } = req.body;
      const user_id = req.userId; // Supposons que vous récupériez l'ID de l'utilisateur à partir de la requête, soit depuis la session, soit depuis le jeton d'authentification.

      // Vérifiez si les données reçues sont valides
      if (!user_id || !product_id || !quantite) {
        return res.status(400).json({ error: 'Les données du produit sont incomplètes.' });
      }

      // Ici, vous pouvez ajouter une logique pour vérifier si l'utilisateur et le produit existent dans la base de données
      // Assurez-vous que l'utilisateur est authentifié avant d'ajouter au panier.

      // Utilisez le dataMapper pour ajouter le produit au panier
     const addProductToPanier= await dataMapper.addingProduct({ user_id, product_id, quantite });

      return res.json({ message: `Produit ${product_id} ajouté au panier avec succès !` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du produit au panier.' });
    }
  },
  getCartData: async (req, res) => {
    try {
      // Récupérez l'ID de l'utilisateur à partir du middleware d'authentification
      const userId = req.userId;

      // Utilisez le DataMapper pour récupérer les données du panier de l'utilisateur
      const cartData = await dataMapper.getCartData(userId);

      // Retournez les données du panier dans la réponse de la requête
      return res.json(cartData);
    } catch (err) {
      // Gérez les erreurs s'il y en a
      console.error('Erreur lors de la récupération des données du panier de l\'utilisateur :', err);
      return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données du panier de l\'utilisateur.' });
    }
  },
  removeProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.userId;
  
      // Vérifiez si les données reçues sont valides
      if (!productId) {
        return res.status(400).json({ error: 'ID de produit manquant.' });
      }
  
      // Utilisez le dataMapper pour supprimer le produit du panier de l'utilisateur
      await dataMapper.removeProduct(userId, productId);
  
      return res.json({ message: `Produit ${productId} supprimé du panier avec succès !` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit du panier.' });
    }
  },
   updateProductQuantity: async(req, res) =>{
    try {
      const userId = req.userId;
      const productId = req.params.productId;
      const newQuantity = req.body.quantite;
  
      await dataMapper.updateProductQuantity(userId, productId, newQuantity);
  
      res.json({ message: 'Quantité mise à jour avec succès !' });
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la quantité du produit dans le panier :", err);
      res.status(500).json({ error: "Erreur lors de la mise à jour de la quantité du produit dans le panier" });
    }
  },
   clearCart: async (req, res) => {
    const userId = req.userId; // Obtenez l'ID de l'utilisateur à partir du token d'authentification
  
    try {
      // Supprimez tous les produits du panier de l'utilisateur dans la base de données
      await dataMapper.clearCart(userId);
      res.status(200).json({ message: "Cart cleared successfully." });
    } catch (error) {
      console.error("Erreur lors de la suppression du panier de l'utilisateur :", error);
      res.status(500).json({ error: "An error occurred while clearing the cart." });
    }
  },
  setCookie: async (req, res) => {
    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    };

    // Remplacez "your_cookie_name" par le nom que vous souhaitez donner au cookie
    // et "your_cookie_value" par la valeur que vous souhaitez stocker dans le cookie
    res.cookie("your_cookie_name", "your_cookie_value", cookieOptions);

    res.send("Cookie ajouté !");
  },
   createCheckoutSession : async (req, res) => {
    const userId = req.userId;
    const lineItems = req.body.lineItems;
  
    try {
      // Ici, vous pouvez effectuer des vérifications supplémentaires avant de créer la session de paiement.
      // Par exemple, assurez-vous que l'utilisateur est autorisé à passer à la caisse, vérifiez les stocks, etc.
  
      // Créez la session de paiement avec les articles et d'autres détails
      const session = await stripe.checkout.sessions.create({
        customer: userId, // Vous pouvez associer le paiement à l'utilisateur ici
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
      });
  
      // Retournez l'ID de la session de paiement à l'utilisateur
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la création de la session de paiement.' });
    }
  },
  getOneProduct: async (req, res) => {
    try {
      const { productId } = req.params; // Récupérez l'ID du produit depuis les paramètres de la requête

      // Utilisez le dataMapper pour récupérer un produit en fonction de son ID
      const product = await dataMapper.OneProduct(productId);

      // Vérifiez si un produit a été trouvé
      if (!product) {
        return res.status(404).json({ message: "Produit non trouvé." });
      }

      // Renvoyez les données du produit dans la réponse
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération du produit." });
    }
  },
  

}
  

module.exports = controller;

