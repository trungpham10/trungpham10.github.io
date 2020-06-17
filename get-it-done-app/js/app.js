// QuoteGarden URL
const randomQuoteURL =
  "https://quote-garden.herokuapp.com/api/v2/quotes/random";
// const allQuoteURL =
//   "https://quote-garden.herokuapp.com/api/v2/quotes?page=1&limit=10";
// const quoteURLByAuthor =
//   "https://quote-garden.herokuapp.com/api/v2/authors/:Jenny-McCarthy?page=1&limit=10";
// const quoteURLByGenre =
//   "https://quote-garden.herokuapp.com/api/v2/genre/:marriage";

// FavQs URL
const baseURL = "https://favqs.com/api/";
const apiKey = "57466b162e44774694d5770fdefbf733";
const quoteOfTheDay = "https://favqs.com/api/qotd";
// const quoteContaining = "https://favqs.com/api/quotes/?filter=funny";
// const quoteTypeAhead = "https://favqs.com/api/typeahead";
// const quoteByAuthor =
//   "GET https://favqs.com/api/quotes/?filter=Mark+Twain&type=author";

$(() => {
  console.log("Connected to js file!");

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
    url: quoteByAuthor,
    token: "57466b162e44774694d5770fdefbf733",
  }).then((quoteData) => {
    console.log("Return quote data success!");
    // $(".container").append(`
    //   <p> "${quoteData.quote.quoteText}" </p>
    //   <p>- ${quoteData.quote.quoteAuthor} </p>
    // `);
    $(".container").append(`
      <p> "${quoteData.quote.body}" </p>
      <p>- ${quoteData.quote.author} </p>
    `);
    console.log(quoteData.quote);
    // console.log(quoteData.quote.quoteText);
    // console.log(quoteData.quote.quoteAuthor);
  });
});
