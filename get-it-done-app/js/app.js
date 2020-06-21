const displayInstruction = () => {
  $("#textInstruction").css("display", "inline");
};

// FavQs URL
const quoteOfTheDay = "https://favqs.com/api/qotd";

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

// Random quote rendering function
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

// Image rendering function
const apiKey = "d2QSjz2XB8QsuMJoKLork9FXnOQSr13t"; // public key
const imageID = "43p9g9"; // test image
const imageURL = `https://wallhaven.cc/api/v1/w/${imageID}?apikey=${apiKey}`;
const randomImageURL = "https://wallhaven.cc/api/v1/search";

const renderImage = () => {
  $.ajax({
    url: imageURL,
  }).then((imageData) => {
    console.log(imageData);
    // console.log(imageData.data[0].path);
    $("body").css("background-image", `url("${imageData.data.path}")`);
  });
};

// After HTML loads
$(() => {
  // Get element
  const searchTerm = document.getElementById("searchTerm");
  const searchButton = $("#searchButton");
  const luckyButton = $("#luckyButton");
  const typeArea = document.getElementById("typeArea");
  const imageButton = $("#imageButton");

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

  // Add image background button
  imageButton.on("click", (event) => {
    event.preventDefault();
    renderImage();
  });

  // Add todo item
  let itemCount = 0;
  typeArea.addEventListener("keypress", (event) => {
    // user hits enter
    if ((event.key === "Enter") & (typeArea.value !== "")) {
      itemCount++;
      $("#textInstruction").css("display", "none");

      const $div = $("<div>").addClass("item");
      const $text = $("<div>").attr("id", "item-text");
      const $deleteButton = $("<div>").attr("id", "item-delete");

      $text.text("‣ " + typeArea.value);
      typeArea.value = ""; // empty text box

      $($div).append($text);
      $($div).append($deleteButton);

      $(".allItems").append($div);

      // cross out an item
      $div.on("click", () => {
        itemCount--;

        const soundEffect = new Audio("Swoosh-1.wav");
        soundEffect.play();
        $text.css("text-decoration", "line-through");
        $text.css("background-color", "dimgray");

        if (itemCount === 0) {
          const applauseEffect = new Audio("Small-applause.wav");
          applauseEffect.play();
        }
      });

      // delete an item
      $deleteButton.on("click", () => {
        const deleteEffect = new Audio("Swoosh-3.wav");
        deleteEffect.play();
        setTimeout(() => {
          $div.remove();
        }, 600);
      });

      // warning on page reload
      window.onbeforeunload = () => {
        return "Data will be lost if you leave the page, are you sure?";
      };
    }
  });
});
