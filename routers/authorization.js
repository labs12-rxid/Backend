const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const client = jwksRsa({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKSURI
  });
  const options = {
    algorithm: 'RS256'
  };
  function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
      let signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
  jwt.verify(token, getKey, options, (error, decoded) => {
    if (error) {
      res.status(400).json({ message: 'Invalid response' });
    } else {
      req.headers.decoded = decoded;
      next();
    }
  });
};
