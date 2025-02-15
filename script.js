//fetch_data from api

function fetchGames(endpoint, callback) {
  console.log("Fetching data from:", endpoint);
  fetch(endpoint, {
    mode: "cors",
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      console.log("Fetched data:", data);
      callback(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById(
        "gameContainer"
      ).innerHTML = `<p>Error fetching data.</p>`;
    });
}

//checking display games

function displayGames(games) {
  var container = document.getElementById("Container");
  container.innerHTML = "";

  if (!games || games.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

 
// dynamics create card by looping
  games.forEach(function (game) {
    var gameElement = document.createElement("div");
    gameElement.classList.add("game");
    gameElement.innerHTML = `
          <h3>${game.title || "Unknown Title"}</h3>
          ${
            game.thumbnail
              ? `<img src="${game.thumbnail}" alt="${game.title}">`
              : ""
          }
          <p><strong>Genre:</strong> ${game.genre || "Unknown Genre"}</p>
          <p><strong>Platform:</strong> ${
            game.platform || "Unknown Platform"
          }</p>
          <a href="${game.game_url}" target="_blank">Play Now</a>
      `;
    container.appendChild(gameElement);
  });
}

//selection category by switch case
document
  .getElementById("categorySelect")
  .addEventListener("change", function (event) {
    var endpoint = "https://www.mmobomb.com/api1/games";
    switch (event.target.value) {
      case "platform":
        endpoint = "https://www.mmobomb.com/api1/games?platform=pc";
        break;
      case "category":
        endpoint = "https://www.mmobomb.com/api1/games?category=shooter";
        break;
      case "alphabetical":
        endpoint = "https://www.mmobomb.com/api1/games?sort-by=alphabetical";
        break;
      case "platform_category_sort":
        endpoint =
          "https://www.mmobomb.com/api1/games?platform=browser&category=mmorpg&sort-by=release-date";
        break;
      case "filter":
        endpoint =
          "https://www.mmobomb.com/api1/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc";
        break;
      case "specific_game":
        endpoint = "https://www.mmobomb.com/api1/game?id=452";
        break;
      case "giveaways":
        endpoint = "https://www.mmobomb.com/api1/giveaways";
        break;
      case "news":
        endpoint = "https://www.mmobomb.com/api1/latestnews";
        break;
    }
    console.log("Selected endpoint:", endpoint);
    fetchGames(endpoint, function (games) {
      displayGames(Array.isArray(games) ? games : [games]);
    });
  });

//initial page

(function initialize() {
  fetchGames("https://www.mmobomb.com/api1/games", displayGames);
})();
