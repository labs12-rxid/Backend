const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
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
    const getKey = (header, callback) => {
      client.getSigningKey(header.kid, (err, key) => {
        let signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
    }
    jwt.verify(token, getKey, options, (error, decoded) => {
      if (error) {
        res.status(401).json({ message: 'Invalid token.' });
      } else {
        req.headers.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided. Access denied.' });
  }
};
