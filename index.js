
const giantBombAPI = "5841ac31e4fdccc68c350d2280fc3fe3992c1d08"

let date = new Date("12/05/2016");

const gBUrl = `https://api.giantbomb.com/games/?`

const rawgUrl = `https://api.rawg.io/api/games?ordering=-added&dates=${formatDate(date)}%2C${formatDate(date)}`

let gbUrlString = gBUrl + "api_key=" + giantBombAPI + "&" + "filter=original_release_date:" + formatDate(date) + "&" + "format=jsonp" + "&" + "callback=jsonpcallback"

function formatDate(date) {
  let month = (date.getMonth() + 1);
  let day = date.getDate();
  let year = date.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    console.log(month.length);
  return [year, month, day].join("-");
}

$(function displayDate() {
  console.log(formatDate(date));
  
})

function getRawg() {
  fetch(rawgUrl)
  .then(response => response.json())
  .then(responseJson => console.log(responseJson));
}


$(function jsonpcallback(data) {
  console.log(data);
});

let script = document.createElement('script');
script.src = gbUrlString
document.getElementsByTagName('head')[0].appendChild(script);

$(getRawg)
