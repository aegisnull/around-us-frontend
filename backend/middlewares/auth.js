const jwt = require('jsonwebtoken');

const auth = (req, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Authorization failed');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'encoding-string');
  } catch (err) {
    throw new Error('Authorization failed');
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
