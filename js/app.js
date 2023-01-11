window.addEventListener("DOMContentLoaded", () => {
  const tabContent = document.querySelectorAll(".tabcontent"),
    tabsBtn = document.querySelector(".tabheader__items"),
    tabsItem = document.querySelectorAll(".tabheader__item");

  function showTabsContent(i = 0) {
    tabContent[i].classList.add("show", "animate");
    tabsItem[i].classList.add("tabheader__item_active");
  }

  function hideTabsContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide", "animate");
      item.classList.remove("show");
    });

    tabsItem.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  hideTabsContent();
  showTabsContent();

  tabsBtn.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabsItem.forEach((element, i) => {
        if (element == target) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });

  ///timer

  const deadline = "2024-01-01";

  function getTimeRemeaning(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minuts = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minuts: minuts,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num > 0 && num < 10) {
      num = `0${num}`;
    } else if (num == 0) {
      num = `00`;
    } else {
      num = num;
    }
    return num;
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");
    const b = setInterval(() => {
      updateClock();
    }, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemeaning(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minuts);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(b);
        days.innerHTML = 0;
        hours.innerHTML = 0;
        minutes.innerHTML = 0;
        seconds.innerHTML = 0;
      }
    }
  }
  setClock(".timer", deadline);

  //Modal

  const btns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector("[data-close]"),
    body = document.querySelector("body");

  function showModal() {
    modal.classList.add("show");
    body.style.overflow = "hidden";
    clearInterval(timout);
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    body.style.overflow = "";
  }

  btns.forEach((item) => {
    item.addEventListener("click", showModal);
  });

  modal.addEventListener("click", function (e) {
    const target = e.target;
    if (target === modal) {
      closeModal();
    }
  });

  modalClose.addEventListener("click", closeModal);

  const timout = setTimeout(showModal, 6000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  /// Usage Class

  class MenuItem {
    constructor(src, alt, title, descr, price, parentSelector, ...clases) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.clases = clases;
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.clases.length === 0 || !this.clases.includes("menu__item")) {
        element.classList.add("menu__item");
      } else {
        this.clases.forEach((className) => {
          element.classList.add(className);
        });
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuItem(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким',
    23,
    ".menu .container",
    "menu__item",
    "adas"
  ).render();

  new MenuItem(
    "img/tabs/elite.jpg",
    "vegy",
    "Меню “Премиум”",
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким',
    20,
    ".menu .container"
  ).render();

  new MenuItem(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким',
    22,
    ".menu .container"
  ).render();

  //slider

  const sliderPrev = document.querySelector(".offer__slider-prev"),
    sliderNext = document.querySelector(".offer__slider-next"),
    slides = document.querySelectorAll(".offer__slide"),
    slidesInner = document.querySelector(".offer__inner"),
    width = window.getComputedStyle(slidesInner).width;
  let activeSlidecurrent = document.querySelector("#current");
  let totalSlides = document.querySelector("#total");
  let activeSlideIndex = 1;
  let offset = 0;

  const updateIndex = () => {
    if (activeSlideIndex < 10) {
      activeSlidecurrent.innerHTML = `0${activeSlideIndex}`;
    } else {
      activeSlidecurrent.innerHTML = activeSlideIndex;
    }

    if (slides.length < 10) {
      totalSlides.innerHTML = `0${slides.length}`;
    } else {
      totalSlides.innerHTML = slides.length;
    }
  };

  slidesInner.style.width = 100 * slides.length + "%";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  updateIndex();

  const slideNext = () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    activeSlideIndex = offset / +width.slice(0, width.length - 2) + 1;
    updateIndex();
    slidesInner.style.transform = `translateX(-${offset}px)`;
  };

  const slidePrev = () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    activeSlideIndex = offset / +width.slice(0, width.length - 2) + 1;
    slidesInner.style.transform = `translateX(-${offset}px)`;
    updateIndex();
  };

  sliderNext.addEventListener("click", () => slideNext());
  sliderPrev.addEventListener("click", () => slidePrev());

  const autoPlay = setInterval(() => slideNext(), 2500);

  slidesInner.addEventListener("mouseover", () => {
    clearInterval(autoPlay);
  });

  // hideSlides();
  // showSlide(activeSlideIndex);

  // sliderNext.addEventListener('click', () => {
  //   activeSlideIndex += 1;
  //   if (activeSlideIndex >= slideLength) {
  //     activeSlideIndex = 0;
  //   }
  //   showSlide(activeSlideIndex);
  // });

  // sliderPrev.addEventListener('click', () => {
  //   activeSlideIndex--;
  //   if (activeSlideIndex < 0) {
  //     activeSlideIndex = slideLength - 1;
  //   }
  //   showSlide(activeSlideIndex);
  // });

  // function hideSlides() {
  //   slides.forEach(slide => {
  //     slide.classList.add('hide');
  //     slide.classList.remove('show');
  //   });
  // }

  // function showSlide(index) {
  //   hideSlides();
  //   slides[index].classList.remove('hide');
  //   slides[index].classList.add('animate');
  //   slides[index].classList.add('show');
  //   activeSlidecurrent.textContent = index + 1;
  //   if (slideLength < 10) {
  //     totalSlides.innerHTML = `0${slideLength}`;
  //   } else {
  //     totalSlides.innerHTML = slideLength;
  //   }
  // }

  /*Calc*/

  let result = document.querySelector(".calculating__result span");

  let sex = "famale",
    weight,
    height,
    age,
    activity = 1.375;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  }else{
    sex = "famale";
     localStorage.setItem("sex", "famale");
  }
  
  if (localStorage.getItem("ratio")) {
    activity = localStorage.getItem("ratio");
  } else{
    activity = 1.375;
    localStorage.setItem("ratio", 1.375);
  }



  function initCalc(selector,activeClass) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.classList.remove(activeClass);
    if(element.getAttribute('id') === localStorage.getItem('sex')){
      element.classList.add(activeClass);
    }

    if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')){
      element.classList.add(activeClass);
    }
  });
  }

   initCalc("#gender div", "calculating__choose-item_active");
   initCalc(".calculating__choose_big div", "calculating__choose-item_active");

  function calc() {
    console.log(sex, weight, height, age, activity);
    if (!sex || !weight || !height || !age || !activity) {
      result.innerHTML = "____";
      return;
    }

    if (sex === "male") {
      result.innerHTML = Math.floor(
        (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity
      );
    } else {
      result.innerHTML = Math.floor(
        (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity
      );
    }
  }
  calc();

  function getDinamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calc();
    });
  }

  getDinamicInformation("#height");
  getDinamicInformation("#weight");
  getDinamicInformation("#age");

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector} div`);

    elements.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          activity = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
          calc();
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
          calc();
        }

        elements.forEach((element) => {
          element.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
      });
    });
  }

  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );
});
