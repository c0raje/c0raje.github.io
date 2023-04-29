function my() {
  var date = new Date();
  var hours = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var day = date.getHours();

  if (hours >= 12) {
    var hh = hours - 12;
  }
  else {
    var hh = hours;
  }
  document.getElementById("hrs").innerHTML = hh;
  document.getElementById('min').innerHTML = min;
  document.getElementById('sec').innerHTML = sec;
  if (hours >= 12) {

    document.getElementById('sect').innerHTML = 'PM';
  }
  else {
    document.getElementById('sect').innerHTML = 'AM';
  }
}
setInterval(my, 10)
