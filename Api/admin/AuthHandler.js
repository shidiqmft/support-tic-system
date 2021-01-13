const connectToDatabase = require('../db');
const Admin = require('./Admin');

/**
 * Fungctions
 */

module.exports.getAdmins = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
   .then(getAdmins)
   .then(admins => ({
     statusCode: 200,
     body: JSON.stringify(admins)
   }))
   .catch(err => ({
     statusCode: err.statusCode || 500,
     headers: { 'Content-Type': 'text/plain' },
     body: JSON.stringify({ message: err.message})
   }));
};

/**
 * Helpers
 */

 function getAdmins() {
   return Admin.find({})
   .then(admins)
   .catch(err => Promise.reject(new Error(err)));
 }