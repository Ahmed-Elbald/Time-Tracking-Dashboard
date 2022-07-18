
// Getting elements from the document

const cardsContainer = document.querySelector("main .container");
const btns = document.querySelectorAll(".row.bottom button.btn");

// Setting the main markup and the card sample.

let cardMarkup = `
<img class="card__img" alt="">
<div class="card__details">
  <div class="row top">
    <span class="card__title"></span>
    <div><img src="images/icon-ellipsis.svg" alt="Show Other Details"></div>
  </div>
  <div class="row bottom">
    <span class="current-time"></span>
    <span class="last-time clr-fadded">
      last <span class="unit"></span> - <span class="value"></span>
    </span>
  </div>
</div>
`

const cardSample = document.createElement("div");
cardSample.innerHTML = cardMarkup;
cardSample.className = "card";

// When the document loads

let request, array;

document.addEventListener("DOMContentLoaded", () => {

  request = fetch("./data.json");

  request.then(request => request.json())
    .then(data => {
      array = data
      showData(array, "daily");
    });


  manageBtns();

});

function showData(array, unit) {

  clearContainer()

  for (let i of array) {

    let title = i["title"];
    let className = title.split(" ").join("").toLowerCase();
    let clone = cardSample.cloneNode(true);
    clone.classList.add(`card--${className}`);

    clone.querySelector("span.card__title").innerHTML = title;
    clone.querySelector(".card__img").src = `images/icon-${className}.svg`;
    clone.querySelector("span.unit").innerHTML = unit == "daily" ? "day"
      : unit == "weekly" ? "week"
        : "month";

    let timeData = i["timeframes"][unit];
    for (let x in timeData) {
      clone.querySelector(".current-time").innerHTML = timeData["current"] + "hrs";
      clone.querySelector(".last-time span.value").innerHTML = timeData["previous"] + "hrs";
    }

    cardsContainer.appendChild(clone);
  }

  addAcive(unit);

}


function manageBtns() {

  btns.forEach(btn => {
    btn.addEventListener("click", (event) => showData(array, event.target.dataset.type))
  })

}


function addAcive(unit) {

  btns.forEach(btn => {
    btn.classList.remove("active");

    if (btn.dataset.type == unit) btn.classList.add("active");
  })

}

function clearContainer() {

  let child = cardsContainer.lastElementChild;
  while (cardsContainer.children.length > 1) {
    if (!child.classList.contains("card--main")) cardsContainer.removeChild(child);
    child = cardsContainer.lastElementChild;
  }

}