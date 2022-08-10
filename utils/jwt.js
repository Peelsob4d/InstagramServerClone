const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const id = user.id;

  const payload = {
    id,
    iat: Date.now(),
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY || 'secret', {
    algorithm: 'HS256',
  });
  return 'bearer ' + token;
  //'bearer ' 헤더에서 받아오기 때문에 반드시 'bearer'를 붙여주어야한다
};
