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
mongoose.model("notifications", NotificationSchema);

module.exports = mongoose.model("notifications");
