const jwt = require('jsonwebtoken');

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = {};
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = 2012-10-17;
    policyDocument.Statement = [];
    const StatementOne = {};
    StatementOne.Action = 'execute-api:Invoke';
    StatementOne.Effect = effect;
    StatementOne.Resource = resource;
    policyDocument.Statement[0] = StatementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

module.exports.auth = (event, context, callback) => {

  const token = event.authorizationToken;

  if (!token)
    return callback(null, 'Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return callback(null, 'Unauthorized');

    return callback(null, generatepolicy(decoded.id, 'Allow', event.methodArn))
  });

};