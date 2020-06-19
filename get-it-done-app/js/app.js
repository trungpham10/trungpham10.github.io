// FavQs URL
const quoteOfTheDay = "https://favqs.com/api/qotd";
const quoteContaining = "https://favqs.com/api/quotes/?filter=entrepreneurs";
const quoteByTag = "https://favqs.com/api/quotes/?filter=technology&type=tag";
const quoteByAuthor =
  "https://favqs.com/api/quotes/?filter=Steve+Jobs&type=author";

$(() => {
  // const inputSearch = document.getElementById("searchTerm");
  // const button = document.getElementById("searchButton");

  // button.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   const searchTerm = inputSearch.value;

  //   console.log(searchTerm);
  // });
  $.ajax({
    url: quoteByAuthor,
    beforeSend: (xhr) => {
      xhr.setRequestHeader(
        "Authorization",
        "Token token=57466b162e44774694d5770fdefbf733"
      );
    },
  }).then((quoteData) => {
    console.log(quoteData);
    console.log(quoteData.quotes.length);
    console.log(Math.round(Math.random() * (quoteData.quotes.length - 1)));
    const randomQuoteChoiceIndex = Math.round(
      Math.random() * (quoteData.quotes.length - 1)
    );

    $(".quoteDisplay").append(`
      <p> "${quoteData.quotes[randomQuoteChoiceIndex].body}" </p>
      <p> – ${quoteData.quotes[randomQuoteChoiceIndex].author} </p>
    `);
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
