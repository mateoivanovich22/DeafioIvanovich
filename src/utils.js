const bcrypt =require("bcrypt") ;
const jwt =require("jsonwebtoken") ;

const private_key = "Codigosecreto";

exports.generateToken = (user) => {
  const token = jwt.sign({ user }, private_key, { expiresIn: "1m" });
  console.log(token);
  return token;
};

exports.authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ error: "No hay autenticacion" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, private_key, (error, credentials) => {
    if (error) return res.status(403).send({ error: "no hay autorizacion" });

    req.user = credentials.user;
    next();
  });
};

exports.createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

exports.isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

