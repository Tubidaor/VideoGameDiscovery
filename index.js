const giantBombAPI = "5841ac31e4fdccc68c350d2280fc3fe3992c1d08"

const gBUrl = `https://api.giantbomb.com/games/?`

const rawgUrl = "https://api.rawg.io/api/games/grand-theft-auto-v/suggested"

function randomDate(start, end) {
  let random =  new Date(Math.round(Math.random() * (end - start)));
  return formatDate(random);
}


function formatDate(date) {
  let month = (date.getMonth() + 1);
  let month2 = (date.getMonth() + 3);
  let day = date.getDate();
  let year = date.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (month2 < 10) {
      month2 = "0" + month2;
    }
    if (day < 10) {
      day = "0" + day;
    }
  console.log([year, month, day].join("-") + "|" + [year,month2, day].join("-"))
  return ([year, month, day].join("-")) + "|" + ([year,month2, day].join("-"));
}

function getRawg() {
  fetch(rawgUrl)
  .then(response => response.json())
  .then(responseJson => console.log(responseJson));
}

let wolverine = "spider-man"

$(document).ready(function(){
  $.ajax({
    url: `https://www.giantbomb.com/api/games/?filter=name:${wolverine}`,
    type: "get",
    data: {api_key : giantBombAPI, format : "jsonp", json_callback : "gamer" },
    dataType: "jsonp"
  });
});

function gamer(data) {
console.log(data.results[0].name);
}

$(document).ready(function(){
  $.ajax({
    url: `https://www.giantbomb.com/api/games/?filter=original_release_date:${randomDate(new Date("12/05/1983"), new Date())}`,
    type: "get",
    data: {api_key : giantBombAPI, format : "jsonp", json_callback : "gamerReleaseDate"},
    dataType: "jsonp"
  });
});
function gamerReleaseDate(data) {
  $('.games').empty();
  for (let i = 0; i < data.results.length; i++) {
    $('.games').append(
      `<div>
        <h2>${data.results[i].name}</h2>
        <img src=${data.results[i].image.screen_url}>
        <p>${data.results[i].deck}</p>
        <p>Game Rating:${data.results[i].original_game_rating} Release Date:${data.results[i].original_release_date}</p>
      </div>`)
  }
console.log(data.results[0].name);
}

$(document).ready(function(){
  $.ajax({
    url: `https://www.giantbomb.com/api/characters/?filter=name:wolverine`,
    type: "get",
    data: {api_key : giantBombAPI, format : "jsonp", json_callback : "gamerCharacter" },
    dataType: "jsonp"
  });
});

function gamerCharacter(data) {
  console.log(data.results[0].name)

}



$(getRawg)

