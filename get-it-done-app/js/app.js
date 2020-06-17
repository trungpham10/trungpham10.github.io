// QuoteGarden URL
const randomQuoteURL =
  "https://quote-garden.herokuapp.com/api/v2/quotes/random";

// FavQs URL
const baseURL = "https://favqs.com/api/";
const apiKey = "57466b162e44774694d5770fdefbf733";
const quoteOfTheDay = "https://favqs.com/api/qotd";

$(() => {
  // const inputSearch = $("#searchTerm");
  const inputSearch = document.getElementById("searchTerm");
  const button = document.getElementById("searchButton");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const searchTerm = inputSearch.value;

    console.log(searchTerm);
  });

  $.ajax({
    type: "GET",
    url: quoteOfTheDay,
    token: "57466b162e44774694d5770fdefbf733",
  }).then((quoteData) => {
    $(".quote").append(`
      <p> "${quoteData.quote.body}" </p>
      <p>- ${quoteData.quote.author} </p>
    `);
    console.log(quoteData.quote);
  });

  const okButton = document.getElementById("ok-button");
  const item = document.getElementById("item");
  item.focus();
  let count = 0;
  okButton.addEventListener("click", (event) => {
    event.preventDefault();
    count++;
    const $div = $("<div>");
    $div.addClass("item-box");
    const $roll = $("<div>");
    $roll.addClass("clear-item");
    $div.append($roll);
    const $h2 = $("<h2>");
    $h2.text(item.value);
    $div.append($h2);
    $(".item").append($div);
    item.value = "";
    if (count == 3) {
      item.remove();
      okButton.remove();
    }

    $h2.on("click", () => {
      $h2.css("text-decoration", "line-through");
    });
  });
});
