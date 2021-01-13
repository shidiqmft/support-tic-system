function formatDate(date) {
  var mydate = new Date(date);
  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][mydate.getMonth()];
  var str = month + " " + mydate.getFullYear();
  return str;
}

module.exports.formatDate = formatDate;
