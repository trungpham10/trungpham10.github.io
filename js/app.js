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

    let quoteBody = quoteData.quotes[randomQuoteChoiceIndex].body;
    let quoteAuthor = quoteData.quotes[randomQuoteChoiceIndex].author;

    let myStorage = window.localStorage;
    myStorage.setItem("body", quoteBody);
    myStorage.setItem("author", quoteAuthor);

    $(".quoteDisplay").append(`
      <div class='quoteSection'>
        <p> "${quoteBody}" </p>
        <p> – ${quoteAuthor} </p>
      </div>
    `);
  });
};

// Random quote rendering function
const renderRandomQuote = () => {
  $.ajax({
    url: quoteOfTheDay,
  }).then((quoteData) => {
    let quoteBody = quoteData.quote.body;
    let quoteAuthor = quoteData.quote.author;

    let myStorage = window.localStorage;
    myStorage.setItem("body", quoteBody);
    myStorage.setItem("author", quoteAuthor);

    $(".quoteDisplay").append(`
      <div class='quoteSection'>
        <p> "${quoteBody}" </p>
        <p> – ${quoteAuthor} </p>
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
  // load data from local storage function
  const loadLocalStorage = () => {
    let itemData = localStorage.getItem("itemList");
    if (itemData) {
      for (let itemText of itemData.split(",")) {
        displayItem(itemText);
      }
    }
  };

  // item displaying function
  const displayItem = (text) => {
    const $div = $("<div>").addClass("item");
    const $text = $("<div>").attr("id", "item-text");
    const $deleteButton = $("<div>").attr("id", "item-delete");

    $text.text("⦾ " + text);
    $($div).append($text);
    $($div).append($deleteButton);

    $(".allItems").append($div);

    // item crossing listener
    $div.on("click", () => {
      // check if item is crossed
      if ($text.css("text-decoration") !== "line-through") {
        itemCount--;
        localStorage.setItem(
          "itemList",
          localStorage
            .getItem("itemList")
            .split(",")
            .filter((e) => e !== text)
            .join(",")
        );
      }
      const soundEffect = new Audio("sound-effect/Swoosh-1.wav");
      soundEffect.play();
      $text.css("text-decoration", "line-through");
      $text.css("background-color", "dimgray");

      // last item applause
      if (itemCount === 0) {
        const applauseEffect = new Audio("sound-effect/Small-applause.wav");
        applauseEffect.play();
        $("#done").css("color", "forestgreen");
      }
    });

    // item deleting listener
    $deleteButton.on("click", (event) => {
      // check if item is crossed
      if ($text.css("text-decoration") !== "line-through") {
        itemCount--;
        localStorage.setItem(
          "itemList",
          localStorage
            .getItem("itemList")
            .split(",")
            .filter((e) => e !== text)
            .join(",")
        );
      }
      event.stopPropagation();
      const deleteEffect = new Audio("sound-effect/Swoosh-3.wav");
      deleteEffect.play();
      setTimeout(() => {
        $div.remove();
      }, 600);

      // last item applause
      if (itemCount === 0) {
        const applauseEffect = new Audio("sound-effect/Small-applause.wav");
        applauseEffect.play();
      }
    });
  };

  // get quote data from localStorage and add to DOM
  let quoteBody = localStorage.getItem("body");
  let quoteAuthor = localStorage.getItem("author");

  if ((quoteBody != null) & (quoteAuthor != null)) {
    $(".quoteDisplay").append(`
    <div class='quoteSection'>
      <p> "${quoteBody}" </p>
      <p> – ${quoteAuthor} </p>
    </div>
  `);
  }

  // get item data from localStorage and add to DOM
  loadLocalStorage();

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
  let itemList = [];
  var itemCount = 0;
  typeArea.addEventListener("keypress", (event) => {
    // user hits enter
    if ((event.key === "Enter") & (typeArea.value !== "")) {
      itemCount++;
      $("#textInstruction").css("display", "none");

      displayItem(typeArea.value);

      let myStorage = window.localStorage;
      if (myStorage.getItem("itemList") != null) {
        itemList = myStorage.getItem("itemList").split(",");
      }
      if (itemList[0] == "") {
        itemList.splice(0, 1);
      }
      itemList.push(typeArea.value);
      myStorage.setItem("itemList", itemList);
      typeArea.value = ""; // empty text box

      // warning on page reload
      window.onbeforeunload = () => {
        return "Data will be lost if you leave the page, are you sure?";
      };
    }
  });
});
