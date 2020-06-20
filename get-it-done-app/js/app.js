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

const renderRandomQuote = () => {
  $.ajax({
    url: quoteOfTheDay,
  }).then((quoteData) => {
    $(".quoteDisplay").append(`
      <div class='quoteSection'>
        <p> "${quoteData.quote.body}" </p>
        <p> – ${quoteData.quote.author} </p>
      </div>
    `);
  });
};

// After HTML loads
$(() => {
  // Get element
  const searchTerm = document.getElementById("searchTerm");
  const searchButton = $("#searchButton");
  const luckyButton = $("#luckyButton");
  const typeArea = document.getElementById("typeArea");

  // Search quote
  searchButton.on("click", (event) => {
    event.preventDefault();
    $(".quoteSection").remove();
    let authorChoice = searchTerm.value.split(" ").join("+");
    quoteByAuthorURL = `https://favqs.com/api/quotes/?filter=${authorChoice}&type=author`;
    renderQuote();
  });

  // Lucky button
  luckyButton.on("click", (event) => {
    event.preventDefault();
    $(".quoteSection").remove();
    renderRandomQuote();
  });

  // Add todo item
  typeArea.addEventListener("keypress", (event) => {
    // user hits enter
    if ((event.key === "Enter") & (typeArea.value !== "")) {
      const $div = $("<div>").addClass("item");
      const $text = $("<div>").attr("id", "item-text");
      const $deleteButton = $("<div>").attr("id", "item-delete");

      $text.text("‣ " + typeArea.value);

      $($div).append($text);
      $($div).append($deleteButton);

      $(".allItems").append($div);

      // click on todo item
      $div.on("click", () => {
        const soundEffect = new Audio("Swoosh-1.wav");
        soundEffect.play();
        $text.css("text-decoration", "line-through");
        $text.css("background-color", "dimgray");

        // click once again for deletion
        $div.on("click", () => {
          const deleteEffect = new Audio("Swoosh-3.wav");
          deleteEffect.play();
          setTimeout(() => {
            $text.remove();
          }, 500);
        });
      });

      // delete an item
      $deleteButton.on("click", () => {
        $div.remove();
      });

      // warning on page reload
      window.onbeforeunload = () => {
        return "Data will be lost if you leave the page, are you sure?";
      };
      typeArea.value = "";
    }
  });
});
