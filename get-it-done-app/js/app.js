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
    url: "https://quote-garden.herokuapp.com/api/v2/quotes/random",
  }).then((quoteData) => {
    console.log("Return quote data success!");
    $(".container").append(`
      <p> "${quoteData.quote.quoteText}" </p>
      <p>- ${quoteData.quote.quoteAuthor} </p>
    `);
    // console.log(quoteData.quote);
    // console.log(quoteData.quote.quoteText);
    // console.log(quoteData.quote.quoteAuthor);
  });
});
