// FavQs URL
const quoteOfTheDay = "https://favqs.com/api/qotd";
const quoteContaining = "https://favqs.com/api/quotes/?filter=entrepreneurs";
const quoteByTag = "https://favqs.com/api/quotes/?filter=technology&type=tag";

// Quote rendering function
const renderQuote = () => {
  $.ajax({
    url: quoteByAuthorURL,
    beforeSend: (xhr) => {
      xhr.setRequestHeader(
        "Authorization",
        "Token token=57466b162e44774694d5770fdefbf733"
      );
    },
  }).then((quoteData) => {
    const randomQuoteChoiceIndex = Math.round(
      Math.random() * (quoteData.quotes.length - 1)
    );
    $(".quoteDisplay").append(`
      <div class='quoteSection'>
      <p> "${quoteData.quotes[randomQuoteChoiceIndex].body}" </p>
      <p> – ${quoteData.quotes[randomQuoteChoiceIndex].author} </p>
      </div>
    `);
  });
};

// After HTML loads
$(() => {
  // Get element
  const searchTerm = document.getElementById("searchTerm");
  const searchButton = $("#searchButton");
  const typeArea = document.getElementById("typeArea");

  // Search quote
  searchButton.on("click", (event) => {
    event.preventDefault();
    $(".quoteSection").remove();
    let authorChoice = searchTerm.value.split(" ").join("+");
    quoteByAuthorURL = `https://favqs.com/api/quotes/?filter=${authorChoice}&type=author`;
    renderQuote();
  });

  // Add todo item
  typeArea.addEventListener("keypress", (event) => {
    // user hits enter
    if (event.key === "Enter") {
      const $div = $("<div>").addClass("item");
      const $text = $("<div>").attr("id", "item-text");

      // click on todo item
      $div.on("click", () => {
        const soundEffect = new Audio("Swoosh-1.wav");
        soundEffect.play();
        $text.css("text-decoration", "line-through");
        $text.css("background-color", "dimgray");
      });
      $text.text(typeArea.value);
      $($div).append($text);

      $(".allItems").append($div);

      // warning on page reload
      window.onbeforeunload = () => {
        return "Data will be lost if you leave the page, are you sure?";
      };
      typeArea.value = "";
    }
  });
});
