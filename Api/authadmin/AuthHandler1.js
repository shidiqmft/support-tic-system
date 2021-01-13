const connectToDatabase = require('../db');
const Admin = require('../admin/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs-then');

/**
 *  Function
 */

 module.exports.me = (event, context) => {
   context.callbackWaitsForEmptyEventLoop = false;
   return connectToDatabase()
   .then(() => 
     me(event.requestContext.authorizer.principalId)
   )
   .then(session => ({
     statusCode: 200,
     body: JSON.stringify(session)
   }))
   .catch(err => ({
     statusCode: err.statusCode || 500,
     headers: { 'Content-type': 'text/plain' },
     body: { stack: err.stack, message: err.message }
   }));
 };

 module.exports.logins = (event, context) => {
   context.callbackWaitsForEmptyEventLoop = false;
   return connectToDatabase()
   .then(() =>
     logins(JSON.parse(event.body))
   )
   .then(session => ({
     statusCode: 200,
     body: JSON.stringify(session)
   }))
   .catch(err => ({
     statusCode: err.statusCode || 500,
     headers: { 'Content-Type': 'text/plain' },
     body: { stack: err.stack, message: err.message }
   }));
 };

 module.exports.registers = (event, context) => {
   context.callbackWaitsForEmptyEventLoop = false;
   return connectToDatabase()
   .then(() =>
    registers(JSON.parse(event.body))
    )
    .then(session => ({
      statusCode: 200,
      body: JSON.stringify(session)
    }))
    .catch(err => ({
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
    }));
 };

 /**
  * Helpers
  */

function me(adminId) {
  return Admin.findById(adminId, { password: 0 })
  .then(admin =>
    !admin
      ? Promise.reject('No admin found.')
      : admin
      )
      .catch(err => Promise.reject(new Error(err)));
  }

function logins(eventBody) {
  return Admin.findOne({ email: eventBody.email })
    .then(admin =>
      !admin
        ? Promise.reject(new Error('Admin with that email does not exits.'))
        : comparePassword(eventBody.password, admin.password, admin._id)
    )
    .then(token => ({ auth: true, token: token }));
  }

  function comparePassword(eventPassword, adminPassword, adminId) {
    return bcrypt.compare(eventPassword, adminPassword)
    .then(passwordIsValid =>
      !passwordIsValid
        ? Promise.reject(new Error('The credential do not match.'))
        : signToken(adminId)
    );
  }

function signToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
}

  function checkIfInputIsValid(eventBody) {
    if (
      !(eventBody.password &&
        eventBody.password.length >= 7)
    ) {
      return Promise.reject(new Error('Password error. Password needs to be longer than 8 characters.'));
    }

    if (
      !(eventBody.name &&
        eventBody.name.length > 5 &&
        typeof eventBody.name === 'string')
    ) return Promise.reject(new Error('Username error. Username needs to longer than  characters'));

    if (
      !(eventBody.email &&
        typeof eventBody.name === 'string')
    ) return Promise.reject(new Error('Email error. Email must have valid characters.'));

    return Promise.resolve();
  }

  function registers(eventBody) {
    return checkIfInputIsValid(eventBody) // validate input
      .then(() =>
        Admin.findOne({ email: eventBody.email }) // check if admin exists
      )
      .then(admin =>
        admin
          ? Promise.reject(new Error('Admin with that email exists.'))
          : bcrypt.hash(eventBody.password, 8) // hash the pass
      )
      .then(hash =>
        Admin.create({ name: eventBody.name, email: eventBody.email, password: hash })
        // crate the new admin
      )
      .then(admin => ({ auth: true, token: signToken(admin._id) }));
      // sign the token and send it back
  }