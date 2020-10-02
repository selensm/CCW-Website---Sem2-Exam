if (window.location.pathname.includes("individual_service.html")) {
  const redirectServiceID = localStorage.getItem("redirectServiceID");

  const individualService = requestPostWP(
    postEndPoint,
    redirectServiceID,
    renderIndividualService
  );

  //  Individual page rendering

  function renderIndividualService(individualService) {
    let currentImage = null;
    let id = individualService.id;
    individualService = individualService.acf;

    document.title = `${individualService.title} | CCW`;
    console.log("rendering page");
    $(".breadcrumbs__item--active a").textContent = individualService.title;

    let descriptions = $$(".main-service__info__description-text p");
    descriptions[0].textContent = individualService.description_long_text1;
    descriptions[1].textContent = individualService.description_long_text2;
    descriptions[2].textContent = individualService.description_long_text3;

    let titles = $$(".main-service__info__description-text h3");
    titles[0].textContent = individualService.description_long_title1;
    titles[1].textContent = individualService.description_long_title2;
    titles[2].textContent = individualService.description_long_title3;

    $(".service-info-card__title").textContent = individualService.title;
    $(".service-info-card__price-value").textContent = individualService.price;

    $(
      ".service-info-card__time-value"
    ).textContent = `${individualService.est_time} - ${individualService.est_time_max} hr`;

    const image = $(".main-service__info__image");

    image.style.backgroundImage = `url(${individualService.imagebefore})`;
    currentImage = individualService.imagebefore;

    setInterval(() => {
      image.classList.add("flash");
      setTimeout(() => {
        if (currentImage == individualService.imageafter) {
          currentImage = individualService.imagebefore;
          image.style.backgroundImage = `url(${individualService.imagebefore})`;
        } else {
          currentImage = individualService.imageafter;
          image.style.backgroundImage = `url(${individualService.imageafter})`;
        }

        setTimeout(() => {
          image.classList.remove("flash");
        }, 1000);
      }, 1000);
    }, 5000);

    $(".service-info-card__button-cart").dataset.id = id;
    $(".service-info-card__button-cart").addEventListener("click", () => {
      addToShoppingCart(event);
    });
    $(".service-info-card__button-buy").dataset.id = id;
    $(".service-info-card__button-buy").addEventListener("click", () => {
      addToShoppingCart(event);
      location.href = "shopping_cart.html";
    });

    let requestString = "?include[]=";
    let reccomendedServiceIDs = [];

    if (individualService.recommended_with_1) {
      reccomendedServiceIDs.push(individualService.recommended_with_1.ID);
    }
    if (individualService.recommended_with_2) {
      reccomendedServiceIDs.push(individualService.recommended_with_2.ID);
    }
    if (individualService.recommended_with_3) {
      reccomendedServiceIDs.push(individualService.recommended_with_3.ID);
    }
    if (individualService.recommended_with_4) {
      reccomendedServiceIDs.push(individualService.recommended_with_4.ID);
    }
    console.log(reccomendedServiceIDs);

    let i = 0;
    reccomendedServiceIDs.forEach((ID) => {
      if (i == 0) {
        console.log(ID);
        requestString += ID;
        i++;
      } else {
        requestString += `&include[]=${ID}`;
      }
      //  requestString += ID
    });

    console.log(requestString);

    if (!reccomendedServiceIDs.length === 0) {
      const reccomendedServices = requestWP(
        noEndPoint,
        requestString,
        renderReccomendedServices
      );
    }
  }
}

function renderReccomendedServices(reccomendedServices) {
  let reccomendedServicesContainer = $(".recommended-services-container__row");

  console.log(reccomendedServices);
  reccomendedServices.forEach((service) => {
    console.log(service);
    reccomendedServicesContainer.innerHTML += createShopCard(
      service,
      "recommended"
    );
  });
}
