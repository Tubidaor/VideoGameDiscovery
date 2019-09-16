const giantBombAPI = "5841ac31e4fdccc68c350d2280fc3fe3992c1d08"


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

function getRawg(gameslike) {
  const options = {
    headers: new Headers({
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36"
    }) 
  }
  const rawgUrl = `https://api.rawg.io/api/games/${gameslike}/suggested`
  fetch(rawgUrl, options)
  .then(response => response.json())
  .then(responseJson => display(responseJson));
}

function display(responseJson) {
  $('.games').empty();
  $('.videos').empty();
  for (let i = 0; i < responseJson.results.length; i++) {
    if (responseJson.results[i].clip !== null ) {
    $('.games').append(
      `<div>
        <h2>${responseJson.results[i].name}</h2>
        <img src="${responseJson.results[i].background_image}">
        <p>${responseJson.results[i].metacritic}</p>
        <p>${responseJson.results[i].playtime}</p>
        <video controls>
          <source src="${responseJson.results[i].clip.clips.full}">
        </video>
        <p>${responseJson.results[i].short_description}</p>
        
        
        </div>`
        )
    }
    }
  console.log(responseJson.results[2].clip.clips.full)
}


$(document).ready(function gameSearch(){
  $('#gameTitle').submit(event => {
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
      $.ajax({
        url: `https://www.giantbomb.com/api/game/${gameID}/`,
        type: "get",
        data: {api_key : giantBombAPI, format : "jsonp", json_callback : "gamerID"},
        dataType: "jsonp"
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
    <div>
      ${data.results.description}
    </div>
    `
    );
  }
  
  
  
  
  $(document).ready(function videoSearch(){
    $('#gameTitle').submit(event => {
      event.preventDefault();
      let gameTitle = $('.gameSearch').val()
      $.ajax({
        url: `https://www.giantbomb.com/api/videos/`,
        type: "get",
        data: {api_key : giantBombAPI, format : "jsonp", filter: `name:${gameTitle}`, json_callback : "videoAdd"},
        dataType: "jsonp"
      });
    });
  });
  
  function videoAdd(data) {
    $('.videos').empty();
    for (let i = 0; data.results.length; i++) {
      if (data.results[i].name !== null){
          $('.videos').append(
            `<h2>${data.results[i].name}</h2>
            <iframe
              src="${data.results[i].embed_player}">
            </frame>`
          );
      }
    }
  }
  
$(document).ready(function randomStart(){
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
        <img src=${data.results[i].image.original_url}>
        <p>${data.results[i].deck}</p>
        <p>Game Rating:${data.results[i].original_game_rating} Release Date:${data.results[i].original_release_date}</p>
      </div>`)
  }
}

$(document).ready(function characterSearch() {
  console.log("character form ran")
  $('#character').submit(event => {
    event.preventDefault();
    let character = $('.chSearch').val();
    console.log(character)
    $.ajax({
      url: `https://www.giantbomb.com/api/characters/?filter=name:${character}`,
      type: "get",
      data: {api_key : giantBombAPI, format : "jsonp", json_callback : "gamerCharacter" },
      dataType: "jsonp"
    });
  });
});
  
function gamerCharacter(data) {
  console.log(data.results[0].name);
  $('.games').empty();
  $('.videos').empty();
  for (let i = 0; i < data.results.length; i++) {
    $('.games').append(
      `<div>
        <h2>${data.results[i].name}</h2>
        <h3>${data.results[i].real_name}</h3>
        <img src=${data.results[i].image.screen_url}>
        <p>${data.results[i].deck}</p>
        <p>${data.results[i].birthday}</p>
        <p>${data.results[i].first_appeared_in_game.name}</p>
      </div>`)
  }
}
function likeGames() {
  $('#simGames').submit(event => {
    event.preventDefault();
    let gameslike = $('.simGames').val();
    let array = gameslike.split(" ")
    let array2 = []
    for (let i = 0; i < array.length; i++) {
      array2.push(array[i]);
    }
    gameslike = array2.join("-")
    getRawg(gameslike);
  });
}

$(document).ready(function explore(){
  $('.games').submit(event => {
    event.preventDefault();
    $.ajax({
      url: `https://www.giantbomb.com/api/games/?filter=original_release_date:${randomDate(new Date("12/05/1983"), new Date())}`,
      type: "get",
      data: {api_key : giantBombAPI, format : "jsonp", json_callback : "random"},
      dataType: "jsonp"
    });
  });
});
function random(data) {
  $('.games').empty();
  for (let i = 0; i < data.results.length; i++) {
    $('.games').append(
      `<div>
        <h2>${data.results[i].name}</h2>
        <img src=${data.results[i].image.original_url}>
        <p>${data.results[i].deck}</p>
        <p>Game Rating:${data.results[i].original_game_rating} Release Date:${data.results[i].original_release_date}</p>
      </div>`)
  }
}

 $(likeGames);
