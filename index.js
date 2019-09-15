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


$(document).ready(function gameSearch(){
  $('form').on('click', '.gsButton', function(event) {
    event.preventDefault();
    let gameTitle = $('.gameSearch').val()
    $.ajax({
      url: `https://www.giantbomb.com/api/search/`,
      type: "get",
      data: {api_key : giantBombAPI, format : "jsonp", resources: "game", query: `${gameTitle}`, json_callback : "gamer"},
      dataType: "jsonp"
    });
  });
});

function gamer(data) {
  console.log(data.results[0].guid);
  const gameID = data.results[0].guid
  console.log(gameID);
  $(document).ready(function() {
    console.log("doc ready ran");
    $('form').on('click', '.gsButton', function(event) {
      event.preventDefault();
      console.log(gameID+"gameID");
      $.ajax({
        url: `https://www.giantbomb.com/api/game/${gameID}/`,
        type: "get",
        data: {api_key : giantBombAPI, format : "jsonp", json_callback : "gamerID"},
        dataType: "jsonp"
      });
    });
  });
}

function gamerID(data) {
  function consoles(data){
    let array = [];
    for (let i = 0; i < data.results.platforms.length; i++){
      array.push(data.results.platforms[i].name);
    }
    console.log(array);
    return array;
  }

  $('.games').empty();
  $('.games').append(
    `<h2>${data.results.name}</h2>
    <img src=${data.results.image.original_url}>
    <p>${data.results.deck}</p>
    <p>${data.results.original_release_date}</p>
    <p>${consoles(data)}</p>
    <p>${data.results.developers[0].name}</p>
    `
    );
  }
  
  
  $('.videos').empty();
    for (let i = 0; i < 6; i++){
      $('.videos').append(
        `<iframe width="420" height="315"
          src="${data.results.videos[i].site_detail_url}">
        </frame>`
      )
  }
















// $(document).ready(function randomStart(){
//   $.ajax({
//     url: `https://www.giantbomb.com/api/games/?filter=original_release_date:${randomDate(new Date("12/05/1983"), new Date())}`,
//     type: "get",
//     data: {api_key : giantBombAPI, format : "jsonp", json_callback : "gamerReleaseDate"},
//     dataType: "jsonp"
//   });
// });
// function gamerReleaseDate(data) {
//   $('.games').empty();
//   for (let i = 0; i < data.results.length; i++) {
//     $('.games').append(
//       `<div>
//         <h2>${data.results[i].name}</h2>
//         <img src=${data.results[i].image.original_url}>
//         <p>${data.results[i].deck}</p>
//         <p>Game Rating:${data.results[i].original_game_rating} Release Date:${data.results[i].original_release_date}</p>
//       </div>`)
//   }
// console.log(data.results[0].name);
// }

// $(document).ready(function characterSearch() {
//   console.log("character form ran")
//   $('form').on('click', '.chButton', function(event) {
//     event.preventDefault();
//     let character = $('.chSearch').val();
//     console.log(character)
//     $.ajax({
//       url: `https://www.giantbomb.com/api/characters/?filter=name:${character}`,
//       type: "get",
//       data: {api_key : giantBombAPI, format : "jsonp", json_callback : "gamerCharacter" },
//       dataType: "jsonp"
//     });
//   });
// });
  
// function gamerCharacter(data) {
//   console.log(data.results[0].name);
//   $('.games').empty();
//   for (let i = 0; i < data.results.length; i++) {
//     $('.games').append(
//       `<div>
//         <h2>${data.results[i].name}</h2>
//         <h3>${data.results[i].real_name}</h3>
//         <img src=${data.results[i].image.screen_url}>
//         <p>${data.results[i].deck}</p>
//         <p>${data.results[i].birthday}</p>
//         <p>${data.results[i].first_appeared_in_game.name}</p>
//       </div>`)
//   }
// }

$(getRawg);
