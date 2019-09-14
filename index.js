
const giantBombAPI = "5841ac31e4fdccc68c350d2280fc3fe3992c1d08"

let date = new Date("12/05/2016");

const gbCallBack = "https://tubidaor.github.io/VideoGameDiscovery/"

const gBUrl = `http://api.giantbomb.com/game/1/?`

const rawgUrl = `https://api.rawg.io/api/games?ordering=-added&dates=${formatDate(date)}%2C${formatDate(date)}`

let gbUrlString = gBUrl + "api_key=" + giantBombAPI + "&" + "filter=original_release_date:" + formatDate(date) + "&" + "format=jsonp" 

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

// const options = {
//   headers: new Headers({
//     Origin: https://tubidaor.github.io/VideoGameDiscovery/
//   })
// }
function getGb() {
  console.log(gbUrlString)
  fetch(gbUrlString)
  .then(response => response.json())
  .then(responseJson => console.log(responseJson));
}

$(getRawg)
$(getGb)