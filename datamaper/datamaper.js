const client = require('../data/database');

const dataMapper = {
  async createOneUser(obj) {
    const query = {
      text: `INSERT INTO "user"
        ("nom", "prenom","email","sex", "password")
        VALUES ($1, $2, $3, $4, $5)`,
      values: [obj.nom, obj.prenom, obj.email,obj.sex, obj.password],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  async getuserFromEmail(email) {
    const query = {
      text: 'SELECT * FROM "user" WHERE "email" = $1',
      values: [email],
    };
    const result = await client.query(query);
    return result.rows[0];
  },
  async addingProduct(obj) {
    const query = {
      text: `INSERT INTO "panier" ("user_id", "product_id", "quantite")
             VALUES ($1, $2, $3)`,
      values: [obj.user_id, obj.product_id, obj.quantite],
    };
    const result = await client.query(query);
    return result.rows;
  },
  
  async getOneProfile(id) {
    const query = {
      text: `SELECT * FROM "user" WHERE id = $1`,
      values: [id],
    };
    const result = await client.query(query);
    return result.rows[0];
  },
  
  async AllProducts(){
    const query = {
      text: 'SELECT * FROM "product"',
    
    };
    const result = await client.query(query);
    return result.rows;
  },
  async getCartData (userId) {
    try {
      const query = {
        text: `
          SELECT p.*, c.quantite
          FROM "panier" c
          INNER JOIN "product" p ON c.product_id = p.id
          WHERE c.user_id = $1
        `,
        values: [userId],
      };
  
      const result = await client.query(query);
      return result.rows;
    } catch (err) {
      console.error("Erreur lors de la récupération des données du panier de l'utilisateur :", err);
      throw err;
    }
  },
  async removeProduct(userId, productId) {
    try {
      const query = {
        text: `
          DELETE FROM "panier"
          WHERE "user_id" = $1 AND "product_id" = $2
        `,
        values: [userId, productId],
      };
  
      await client.query(query);
    } catch (err) {
      console.error("Erreur lors de la suppression du produit du panier de l'utilisateur :", err);
      throw err;
    }
  },
  async updateProductQuantity(userId, productId, newQuantity) {
    try {
      const query = {
        text: `
          UPDATE "panier"
          SET "quantite" = $1
          WHERE "user_id" = $2 AND "product_id" = $3
        `,
        values: [newQuantity, userId, productId],
      };

      await client.query(query);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la quantité du produit dans le panier :", err);
      throw err;
    }
  },
  async clearCart (userId)  {
    try {
      const query = {
        text: `
          DELETE FROM "panier"
          WHERE "user_id" = $1
        `,
        values: [userId],
      };
  
      await client.query(query);
    } catch (err) {
      console.error("Erreur lors de la suppression du panier de l'utilisateur :", err);
      throw err;
    }
  },
  async OneProduct(productId) {
    try {
      const query = {
        text: 'SELECT * FROM "product" WHERE "id" = $1',
        values: [productId],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  
  
 

};

module.exports = dataMapper;
