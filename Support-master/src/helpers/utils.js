function formatDate(date) {
  var mydate = new Date(date);
  // var month = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ][mydate.getMonth()];
  // var str = mydate.getDate() + " " + month + " " + mydate.getFullYear();
  var month = mydate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var tgl = mydate.getDate();
  if (tgl < 10) {
    tgl = "0" + tgl;
  }
  var str = mydate.getFullYear() + "-" + month + "-" + tgl;
  return str;
}

const utils = {
  formatDate,
};
export default utils;
