// FavQs URL
const quoteOfTheDay = "https://favqs.com/api/qotd";
const quoteContaining = "https://favqs.com/api/quotes/?filter=entrepreneurs";
const quoteByTag = "https://favqs.com/api/quotes/?filter=technology&type=tag";

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
    // console.log(quoteData);
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

$(() => {
  const $searchTerm = document.getElementById("searchTerm");
  const $button = $("#searchButton");

  $button.on("click", (event) => {
    event.preventDefault();
    $(".quoteSection").remove();
    console.log($searchTerm.value);
    let authorChoice = $searchTerm.value.split(" ").join("+");
    quoteByAuthorURL = `https://favqs.com/api/quotes/?filter=${authorChoice}&type=author`;
    console.log(quoteByAuthorURL);
    renderQuote();
  });

  // const okButton = document.getElementById("okButton");
  const typeArea = document.getElementById("typeArea");
  let count = 0;
  typeArea.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      count++;
      const $div = $("<div>").addClass("item");
      const $ball = $("<div>").attr("id", "item-ball");
      const $text = $("<div>").attr("id", "item-text");
      $div.on("click", () => {
        const soundEffect = new Audio("Swoosh-1.wav");
        soundEffect.play();
        $text.css("text-decoration", "line-through");
        $text.css("background-color", "dimgray");
      });
      $text.text(typeArea.value);
      $($div).append($ball);
      $($div).append($text);

      $(".allItems").append($div);

      window.onbeforeunload = () => {
        return "Data will be lost if you leave the page, are you sure?";
      };
      // const $roll = $("<div>");
      // $roll.addClass("clear-item");
      // $div.append($roll);
      // const $text = $("<div class='item-text'>");
      // $text.text(typeArea.value);
      // $div.append($text);
      // $(".item").append($div);
      typeArea.value = "";
      // if (count == 3) {
      //   typeArea.remove();
      // }
    }
    // $text.on("click", () => {
    //   $roll.addClass("animation");
    //   $text.css("text-decoration", "line-through");
    //   $roll.className -= "animation";
    // });
  });
});
