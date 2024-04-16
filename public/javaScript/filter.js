const sliderBar = document.querySelector(".filters");

const arrowBtns = document.querySelectorAll(".arrow-key");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let sliderBarWidth = sliderBar.clientWidth; //gettign sliderbar width for scrolling
    sliderBar.scrollLeft += btn.id == "left" ? -sliderBarWidth : sliderBarWidth;
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const listingCards = document.querySelectorAll(".listing-card");
//categories of all the listings
const listingCategories = document.querySelectorAll(".listing-category");

for (let button of filterButtons) {
  button.addEventListener("click", () => {
    if (document.querySelector(".active-btn")) document.querySelector(".active-btn").classList.remove("active-btn");
    button.classList.add("active-btn");
    console.log(button.name);
    //logic for removing and adding lisitng on click
    for (let [index, value] of listingCards.entries()) {
      if (button.name == listingCategories[index].innerText) {
        value.classList.remove("hide");
      } else {
        value.classList.add("hide");
      }
      if (button.name == "all" || listingCategories[index].innerText) {
        value.classList.remove("hide");
      }
    }
  });
}
