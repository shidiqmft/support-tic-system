const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  notification: {
    type: String,
    required: true,
  },
});
mongoose.model("Notification", NotificationSchema);

module.exports = mongoose.model("Notification");
