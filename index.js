const giantBombAPI = '5841ac31e4fdccc68c350d2280fc3fe3992c1d08';

function randomStart(){
  $.ajax({
    url: `https://www.giantbomb.com/api/games/?filter=original_release_date:${randomDate(new Date("12/05/1983"), new Date())}`,
    type: 'get',
    data: {
      api_key : giantBombAPI,
      format : 'jsonp',
      json_callback : 'randomGames'
    },
    dataType: 'jsonp'
  });
}

function randomGames(data) {
  data.results[Math.random() * data.results.length]; 
    $('.games').empty();
    for (let i = 0; i < 40; i++) {
      if (data.results[i].image.original_url.includes('default') === true) {
        i++
      } else {
      $('.games').append(
        `<div class="results">
          <img src=${data.results[i].image.original_url} alt="Video game cover art for ${data.results[i].name}">
          <p>${data.results[i].deck || ''}</p>
          <p><a href="${data.results[i].site_detail_url || ''}" target="_blank"> See more details about ${data.results[i].name}</a> </p>
        </div>`
      );
    }
  }
}

function formatDate(date) {
  let month = (date.getMonth() + 1);
  let month2 = (date.getMonth() + 1);
  let day = date.getDate();
  let year = date.getFullYear();
  let year2 = date.getFullYear();
    if (month < 10) {
      month = '0' + month;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    if (day < 10) {
      day = '0' + day;
    }
    year2 = year2 + 1;
  return ([year, month, day].join('-')) + '|' + ([year2,month2, day].join('-'));
}

function randomDate(start, end) {
  let random =  new Date(Math.round(Math.random() * (end - start)));
  return formatDate(random);
}

function renderGameByTitle(data) {
  try {
    if (data.results.length < 1) throw 'No results to display. Please try again.';
    const gameID = data.results[0].guid;
    $(document).ready(function() {
      $.ajax({
        url: `https://www.giantbomb.com/api/game/${gameID}/`,
        type: 'get',
        data: {
          api_key : giantBombAPI,
          format : 'jsonp',
          json_callback : 'getGameById'
        },
        dataType: 'jsonp', 
      });
    });
  } catch(err) {
    noResults(err);
  }
} 

function gameSearch(){
  $('#gameTitle').submit(event => {
    event.preventDefault();
    let gameTitle = $('.game.Search').val();
    $.ajax({
      url: `https://www.giantbomb.com/api/search/`,
      type: 'get',
      data: {
        api_key : giantBombAPI,
        format : 'jsonp',
        resources: 'game',
        query: `${gameTitle}`,
        json_callback : 'renderGameByTitle'
      },
      dataType: 'jsonp'
    });
  }); 
}

function likeGames() {
  $('#simGames').submit(event => {
    event.preventDefault();
    let gameslike = $('.sim.Search').val();
    let array = gameslike.split(" ");
    let array2 = [];
    for (let i = 0; i < array.length; i++) {
      array2.push(array[i]);
    }
    gameslike = array2.join('-');
    getRawgAPI(gameslike);
  });
}

function getRawgAPI(gameslike) {
  const options = {
    headers: new Headers({
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36"
    })
  }
  const rawgUrl = `https://api.rawg.io/api/games/${gameslike}/suggested?page_size=80`;
  fetch(rawgUrl, options)
  .then(response => {
    if(response.ok) {
      return response.json();
    } throw 'No results to display. Please try again.';
  })
  .then(responseJson => renderSimGames(responseJson))
  .catch(err => {
    noResults(err);
  });
}

function renderSimGames(responseJson) {
  $('.games').empty();
  $('.videos').empty();
  for (let i = 0; i < responseJson.results.length; i++) {
    if (responseJson.results[i].clip === null ) {
      $('.games').append(
        `<div class="results">
          <h2>${responseJson.results[i].name || ''}</h2>
          <img src="${responseJson.results[i].background_image || ''}" alt="Video game cover art for ${responseJson.results[i].name || ''}">
          <p>Metacritic Score: ${responseJson.results[i].metacritic || 'Not Available'}</p>
          <p>${responseJson.results[i].short_description || ''}</p>
        </div>`
      );
    } else {
      $('.games').append(
        `<div class="results">
          <h2>${responseJson.results[i].name || ''}</h2>
          <img src="${responseJson.results[i].background_image || ''}" alt="Video game cover art for ${responseJson.results[i].name || ''}">
          <p>Metacritic Score: ${responseJson.results[i].metacritic || 'Not Available'}</p>
          <p>${responseJson.results[i].short_description || ''}</p>
          <video controls>
            <source src="${responseJson.results[i].clip.clips.full || ''}">
          </video>
        </div>`
      );
    }
  }
}

function consoles(data){
  let array = [];
  for (let i = 0; i < data.results.platforms.length; i++){
    array.push(' ' + data.results.platforms[i].name);
  }
  return array;
}

function getGameById(data) {
  $('.games').empty();
  try {
    if (data.results.length < 1) throw 'No results to display. Please try again.'
    gameMakers = data.results.developers
    if (gameMakers === null) {
      $('.games').append(
        `<div class="results">
          <h2>${data.results.name || ''}</h2>
          <img src=${data.results.image.original_url || ''} alt="Video game cover art for ${data.results.name}">
          <p>${data.results.deck || ''}</p>
          <p>${data.results.original_release_date || ''}</p>
          <p>${consoles(data) || ''}</p>
          <div>
            ${data.results.description || ''}
          </div>
        </div>`
      );
    } else {
      $('.games').append(
        `<div class="results">
          <h2>${data.results.name || ''}</h2>
          <img src=${data.results.image.original_url || ''} alt="Video game cover art for ${data.results.name}">
          <p>${data.results.deck || ''}</p>
          <p>${data.results.original_release_date || ''}</p>
          <p>${consoles(data) || ''}</p>
          <p>${data.results.developers.name || ''}</p>
          <div>
            ${data.results.description || ''}
          </div>
        </div>`
      );
    }
  } catch(err) {
    noResults(err);
  }
  changeAttribute();
}

function changeAttribute() {
  $(document).ready(function() {
    $('figure').each(function() {
      $('figure').attr('style', '');
    });
    $('.js-lazy-load-image').each(function() {
      $('.js-lazy-load-image').attr('src','')
    });
  });
}

function characterSearch() {
  $('#character').submit(event => {
    event.preventDefault();
    let character = $('.ch.Search').val();
    $.ajax({
      url: `https://www.giantbomb.com/api/characters/?filter=name:${character}`,
      type: 'get',
      data: {
        api_key : giantBombAPI,
        format : 'jsonp',
        json_callback: 'renderByCharacter'
      },
      dataType: 'jsonp',
    });
  });
}

function renderByCharacter(data) {
  $('.games').empty();
  $('.videos').empty();
  try {
    if (data.results.length < 1) throw 'No Results to Display. Please try again.'
    for (let i = 0; i < data.results.length; i++) {
      $('.games').append(
        `<div class="results">
          <h2>${data.results[i].name || ''}</h2>
          <h3>${data.results[i].real_name || ''}</h3>
          <img src=${data.results[i].image.original_url || ''} alt="Video game cover art for ${data.results[i].name}">
          <p>${data.results[i].deck || ''}</p>
          <p>${data.results[i].birthday || ''}</p>
          <p>First appeared in a game in:${data.results[i].first_appeared_in_game.name || 'Data not available'}
          <br/><br/>
          <a href="${data.results[i].site_detail_url || ''}" target="_blank"> See more details about ${data.results[i].name}
          </a>
          </p>
        </div>`);
      }
  } catch(err) {
    noResults(err);
  }
}

function noResults(err) {
  $('.games').empty();
  $('.games').append(
    `<div class="noResults">
      <div class="results">
        <h2>${err}</h2>
      </div>
    </div>`
  );
}

function exploreGames(){
  $('#explore').submit(event => {
    event.preventDefault();
    $.ajax({
      url: `https://www.giantbomb.com/api/games/?filter=original_release_date:${randomDate(new Date("12/05/1983"), new Date())}`,
      type: 'get',
      data: {
        api_key : giantBombAPI,
        format : 'jsonp',
        json_callback : 'randomGames'
      },
      dataType: 'jsonp'
    });
  });
}

$(document).ready(function() {
  randomStart();
  gameSearch();
  characterSearch();
  exploreGames();
  }
);

$(likeGames);
