// QuoteGarden URL
const randomQuoteURL =
  "https://quote-garden.herokuapp.com/api/v2/quotes/random";

// FavQs URL
const baseURL = "https://favqs.com/api/";
const apiKey = "57466b162e44774694d5770fdefbf733";
const quoteOfTheDay = "https://favqs.com/api/qotd";

$(() => {
  // const inputSearch = document.getElementById("searchTerm");
  // const button = document.getElementById("searchButton");

  // button.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   const searchTerm = inputSearch.value;

  //   console.log(searchTerm);
  // });

  // $.ajax({
  //   type: "GET",
  //   url: quoteOfTheDay,
  //   token: "57466b162e44774694d5770fdefbf733",
  // }).then((quoteData) => {
  //   $(".quote").append(`
  //     <p> "${quoteData.quote.body}" </p>
  //     <p>- ${quoteData.quote.author} </p>
  //   `);
  //   console.log(quoteData.quote);
  // });

  // const okButton = document.getElementById("okButton");
  const typeArea = document.getElementById("typeArea");
  let count = 0;
  typeArea.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      console.log(typeArea.value);
    }
    // count++;
    // const $div = $("<div>");
    // $div.addClass("item-box");
    // const $roll = $("<div>");
    // $roll.addClass("clear-item");
    // $div.append($roll);
    // const $text = $("<div class='item-text'>");
    // $text.text(typeArea.value);
    // $div.append($text);
    // $(".item").append($div);
    // typeArea.value = "";
    // if (count == 3) {
    //   typeArea.remove();
    // }

    // $text.on("click", () => {
    //   $roll.addClass("animation");
    //   $text.css("text-decoration", "line-through");
    //   $roll.className -= "animation";
    // });
  });
});
