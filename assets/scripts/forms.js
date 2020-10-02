// const dropdowns = $$(".dropdown");
const dropdown_Title = $$(".dropdown__title");
const dropdown_OptionsContainer = $$(".dropdown__options-container");

initDropdowns();

function customizeDropdownEvent(dropdownElement, callback) {
  dropdownElement.querySelectorAll(".dropdown__option").forEach((option) => {
    option.addEventListener("click", callback);
  });
}

function initDropdowns() {
  dropdown_Title.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
      dropdown.querySelector(".fas").classList.toggle("fa-chevron-up");
      dropdown.querySelector(".fas").classList.toggle("fa-chevron-down");
      dropdown.parentElement
        .querySelector(".dropdown__options-container")
        .classList.toggle("hidden");
    });
  });

  dropdown_OptionsContainer.forEach((dropdown) => {
    dropdown.childNodes.forEach((childNode) => {
      childNode.addEventListener("click", () => {
        childNode.parentElement.parentElement.querySelector(
          ".dropdown__title"
        ).innerHTML =
          childNode.textContent +
          '<i class="fas fa-chevron-down expanded"></i>';

        if (childNode.parentElement.parentElement.id == "dropdownLocation") {
          date_picker_element.classList.remove("hidden");
          childNode.parentElement.parentElement.classList.remove("invalid");
        }

        if (childNode.parentElement.parentElement.id == "dropdownTime") {
          childNode.parentElement.parentElement.classList.remove("invalid");
        }

        childNode.parentElement.parentElement.dataset.value =
          childNode.textContent;

        childNode.parentElement.parentElement
          .querySelector(".dropdown__options-container")
          .classList.toggle("hidden");
      });
    });
  });
}

// Sliders
const slidersSettings = {
  fill: "#55beee",
  background: "#f9f9f9",
};

const sliders = $$('input[type="range"]');

sliders.forEach((slider) => {
  slider.addEventListener("input", (event) => {
    applyFill(event.target);
  });
  applyFill(slider);
});

function applyFill(slider) {
  const percentage =
    (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const bg = `linear-gradient(90deg, ${slidersSettings.fill} ${percentage}%, ${
    slidersSettings.background
  } ${percentage + 0.1}%)`;
  slider.style.background = bg;
}

const collapseFiltersButtonOutside = $("#collapseFiltersButtonOutside"),
  collapseFiltersButtonInside = $("#collapseFiltersButtonInside");
const filtersBody = $(".filters__body");

if (collapseFiltersButtonOutside) {
  collapseFiltersButtonOutside.addEventListener("click", () => {
    filtersBody.classList.toggle("hidden");
  });
}

if (collapseFiltersButtonInside) {
  collapseFiltersButtonInside.addEventListener("click", () => {
    filtersBody.classList.toggle("hidden");
  });
}
