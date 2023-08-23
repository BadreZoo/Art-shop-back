const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un à l'en-tête de la requête." });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    if (err.response && err.response.status === 401 && err.response.data.message === "jeton d'authentification invalide")  {
      // Si le jeton a expiré, supprimez-le du local storage
      localStorage.removeItem('token');
      return res.status(401).json({ message: "Votre session a expiré. Vous avez été déconnecté." });
    }
    return res.status(401).json({ message: "Jeton d'authentification invalide. Vous avez été déconnecté." });
  }
};

module.exports = verifyToken;
