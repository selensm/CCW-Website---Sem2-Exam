const footer = $("footer");

window.addEventListener("scroll", () => {
  let view = footer.getBoundingClientRect();
  let fullViewport = document.documentElement.clientHeight;
  if (view.top <= fullViewport) {
    const filtersBody = $(".filters__body");
    let filtersHeight = filtersBody.offsetHeight;
    let footerHeight = footer.offsetHeight;
    let offset = view.top - filtersHeight;
    filtersBody.style.top = `${offset}px`;
    return;
  } else {
    filtersBody.style.removeProperty("top");
  }
});
