const connectToDatabase = require("../db");
const Notification = require("./Notification");

/**
 * Functions
 */

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Notification.create(JSON.parse(event.body))
      .then((notification) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(notification),
        })
      )
      .catch((err) => {
        console.log(err);
        return callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not create the notification.",
        });
      });
  });
};

module.exports.getNotificationsByUserId = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const userId = event.pathParameters.userId;
  connectToDatabase().then(() => {
    Notification.find({
      userId,
    })
      .then((notifications) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(notifications),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the notifications.",
        })
      );
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Ticket.findById(event.pathParameters.id)
      .then((ticket) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(ticket),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the ticket.",
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const qr = event.queryStringParameters;
  let where = {};
  where.is_deleted = undefined;
  if (qr) {
    const email = qr.email;
    if (
      email !== null &&
      email !== "null" &&
      email !== "" &&
      email !== undefined
    ) {
      where.email = email;
    }
    const is_deleted = event.queryStringParameters.is_deleted;
    if (
      is_deleted !== null &&
      is_deleted !== "null" &&
      is_deleted !== "" &&
      is_deleted !== undefined
    ) {
      where.is_deleted = true;
    }
  }
  // console.log("where", where);
  connectToDatabase().then(() => {
    Ticket.find(where)
      .then((ticket) => {
        // ticket = ticket.map((item) => {
        //   item.date = utils.formatDate(item.date);
        //   item.hehe = "anam";
        //   return item;
        // });
        // console.log("ticket", ticket);
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ticket),
        });
      })
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the ticket.",
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Ticket.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true,
    })
      .then((ticket) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(ticket),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the ticket.",
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Ticket.findByIdAndRemove(event.pathParameters.id)
      .then((ticket) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: "Removed ticket with id: " + note._id,
            note: note,
          }),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the ticket.",
        })
      );
  });
};
