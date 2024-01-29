const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  // Obtenha o token no cabecalho da solicitacao
  const tokenHeader = req.header('Authorization');


  // Verifique se o token esta presente
  if (!tokenHeader) return res.status(401).json({ message: "Token nao fornecido" });

  // Remova o prefixo 'Bearer ' do token, se presente
  const token = tokenHeader.replace('Bearer ', '');

  try {
    // Verifique e codifique o token
    const decoded = jwt.verify(token, 'suaChaveSecreta');
    // Adicione o usuario decodificado ao objeto de solicitacao
    req.user = decoded;

    // Continue para a proixma middleware ou rota
    next()
  } catch (error) {
    // Se houver um erro na verificacao do token
    res.status(401).json({ message: "Token invalido" })
  }
}

module.exports = verifyToken