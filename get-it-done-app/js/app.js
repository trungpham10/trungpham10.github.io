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
});
