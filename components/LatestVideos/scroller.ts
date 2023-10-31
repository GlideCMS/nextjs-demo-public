const $ = require("jquery");

export class LatestVideoScroller {
  constructor() {
    if (typeof window !== "undefined") {
      // Client-side-only code
      this.init();
    }
  }

  private init = () => {
    this.addEvents();
  };

  private addEvents = () => {
    let scrolled = 0;
    const carousel = document.querySelector(".js-ac-carousel");
    const scroller = document.querySelector(".js-ac-scroller");

    let carouselWidth =
      parseFloat(getComputedStyle(carousel, null).width.replace("px", "")) -
      parseFloat(getComputedStyle(scroller, null).width.replace("px", ""));

    const leftArrow = document.querySelector(".js-ac-left-scroll");
    const rightArrow = document.querySelector(".js-ac-right-scroll");

    leftArrow.addEventListener("click", () => {
      carouselWidth =
        parseFloat(getComputedStyle(carousel, null).width.replace("px", "")) -
        parseFloat(getComputedStyle(scroller, null).width.replace("px", ""));

      rightArrow.classList.remove("ac-inactive");
      leftArrow.classList.remove("ac-inactive");

      if (scrolled >= 0) {
        scrolled = scrolled - 240;
      }

      $(".js-ac-scroller").animate({
        scrollLeft: scrolled,
      });

      if (scrolled <= 0) {
        leftArrow.className += " ac-inactive";
        scrolled = 0;
      }
    });

    rightArrow.addEventListener("click", () => {
      carouselWidth =
        parseFloat(getComputedStyle(carousel, null).width.replace("px", "")) -
        parseFloat(getComputedStyle(scroller, null).width.replace("px", ""));

      rightArrow.classList.remove("ac-inactive");
      leftArrow.classList.remove("ac-inactive");

      if (scrolled < carouselWidth) {
        scrolled = scrolled + 240;
        $(".js-ac-scroller").animate({
          scrollLeft: scrolled,
        });
      }

      if (scrolled >= carouselWidth) {
        scrolled = carouselWidth;
        rightArrow.className += " ac-inactive";
      }
    });
  };
}
