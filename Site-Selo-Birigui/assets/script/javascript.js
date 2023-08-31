const controls = document.querySelectorAll(".control");
let currentItem = 0;
let isAnimating = false;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", async (e) => {
    if (isAnimating) return;
    isAnimating = true;

    const isLeftButton = control.classList.contains("arrow-left");

    if (isLeftButton) {
      currentItem -= 1;
      if (currentItem < 0) {
        currentItem = maxItems - 1;
      }
    } else {
      currentItem += 1;
      if (currentItem >= maxItems) {
        currentItem = 0;
      }
    }

    try {
      items[currentItem].classList.add("current-item");

      await items[currentItem].scrollIntoView({
        inline: "center",
        behavior: "smooth",
        block: "nearest"
      });

      items.forEach((item, index) => {
        if (index !== currentItem) {
          item.classList.remove("current-item");
        }
      });
    } catch (error) {
      console.error("Error scrolling:", error);
    }

    isAnimating = false;
  });
});
