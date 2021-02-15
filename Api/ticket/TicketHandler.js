const connectToDatabase = require("../db");
const Ticket = require("./Ticket");
const User = require("./../user/User");
const Notification = require("./../notifications/Notification");
const utils = require("./../utils");
const MailGen = require('mailgen');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

/**
 * Functions
 */

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const mailGenerator = new MailGen({
    theme: 'salted',
    product: {
      name: 'Support Ticketing System',
      link: 'http://localhost:3000/login',
      // logo: URL logo,
    },
  })

const email = {
  body: {
    name: 'Team',
    intro: '<strong>You Have a New Ticket!</strong>',
    action: {
      instructions: 'You Must Login to Your Account Support Ticketing System<p>Please click the button below to login your account</p>',
      button: {
        color: '#FFC300',
        text: 'Login Account',
        link: 'http://localhost:3000/login',
      },
    },
  },
}

const emailTemplate = mailGenerator.generate(email)
require('fs').writeFileSync('preview.html', emailTemplate, 'utf8')

  const msg = {
    to: "shidiq.13@students.amikom.ac.id", // Change to your recipient
    from: "suppport.ticket.system@gmail.com", // Change to your verified sender
    subject: "You Have a New Ticket!",
    text: "You Must Check Your Ticket Now",
    html: emailTemplate ,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error("sendgrid", error);
    });

  connectToDatabase().then(() => {
    const data = JSON.parse(event.body);
    User.findOne({
      email: data.email,
    }).then((user) => {
      console.log("user", user);
      Notification.create({
        userId: user._id,
        notification: "You have received a ticket from Admin",
      });
    });
    Ticket.create(data)
      .then((ticket) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(ticket),
        })
      )
      .catch((err) => {
        console.log(err);
        return callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not create the ticket.",
        });
      });
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

/**
 * Helpers
 */

