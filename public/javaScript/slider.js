const sliderBar = document.querySelector(".filters");

const arrowBtns = document.querySelectorAll(".arrow-key");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let sliderBarWidth = sliderBar.clientWidth; //gettign sliderbar width for scrolling
    sliderBar.scrollLeft += btn.id == "left" ? -sliderBarWidth : sliderBarWidth;
  });
});
