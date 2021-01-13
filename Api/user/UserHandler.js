const connectToDatabase = require('../db');
const User = require('./User');

/**
 * Functions
 */

module.exports.getUsers = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(getUsers)
    .then(users => ({
      statusCode: 200,
      body: JSON.stringify(users)
    }))
    .catch(err => ({
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ message: err.message })
    }));
};

// module.exports.getTables = (event, context) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   return connectToDatabase()
//     .then(getTables)
//     .then(tables => ({
//       statusCode: 200,
//       body: JSON.stringify(tables)
//     }))
//     .catch(err => ({
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: JSON.stringify({ message: err.message })
//     }));
// };

/**
 * Helpers
 */

 function getUsers() {
  return User.find({})
    .then(users => users)
    .catch(err => Promise.reject(new Error(err)));
}

// function getTables() {
//   return User.aggregate([
// {$skip : 5},
// {$limit :20},  
// {$sort: {
//   name: 1,
//   email: 1
//         }
// },
// {$project: {
//   name: 1,
//   email: 1,
//   username: 1
//            }
// },
// {}
//     // {$match : {"telegramPIN": "Jnzoeb4"}}
// ])
// }
    // .then(tables => tables)
    // .catch(err => Promise.reject(new Error(err)));