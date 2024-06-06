// menu
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburgerBtn= document.querySelector(".hamburgerBtn");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "flex";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "flex";
    menuIcon.style.display = "none";
  }
}

hamburgerBtn.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)



// slider
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('.slide'));
const slideCount = slides.length;
let slideIndex = 0;

prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

updateSlider();


const DATA = [
  {
    "name": "Полет",
    "image": "/filter/pic-1.svg",
    "cost": 13450000,
    "size": "studio",
    "flat": "Студия",
    "area": 29.1,
    "zone": "flight"
  },
  {
    "name": "Факел",
    "image": "../img/filter/pic-2.svg",
    "cost": 9200000,
    "size": "studio",
    "flat": "Студия",
    "area": 28.1,
    "zone": "fakel"
  },
  {
    "name": "Дивный сад",
    "image": "../img/filter/pic-3.svg",
    "cost": 28870000,
    "size": "studio",
    "flat": "Студия",
    "area": 23.8,
    "zone": "garden"
  },
  {
    "name": "Собрание 21",
    "image": "../img/filter/pic-4.svg",
    "cost": 12600000,
    "size": "studio",
    "flat": "Студия",
    "area": 34.3,
    "zone": "event"
  },
  // (other apartment objects...)
];

document.addEventListener('DOMContentLoaded', function() {
  const filters = document.getElementById('filters');
  const goodsContainer = document.getElementById('filterContent');
  const showButton = document.querySelector('.form__info-link');
  const clearButtonContainer = document.getElementById('clear-filters-container');
  const clearButton = document.getElementById('clear-filters');

  function renderGoods(data) {
    goodsContainer.innerHTML = '';
    data.forEach(item => {
      const goodDiv = document.createElement('div');
      goodDiv.classList.add('filter-card');
      goodDiv.dataset.zone = item.zone;
      goodDiv.dataset.size = item.size;
      goodDiv.dataset.price = item.cost;
      goodDiv.dataset.area = item.area;
      goodDiv.innerHTML = `
        <div class="card__title">
          <h3 class="filter__card-title">${item.name}</h3>
        </div>
        <div class="card__img">
          <img class="filter__card-img" src="${item.image}" alt="${item.name}">
        </div>
        <div class="card__text">
          <p class="filter__card-price">${item.cost} P</p>
          <p class="filter__card-flat">${item.flat}</p>
          <p class="filter__card-area">Площадь: ${item.area} м²</p>
        </div>
      `;
      goodsContainer.appendChild(goodDiv);
    });
  }

  function filterGoods(event) {
    if (event) event.preventDefault();

    const zone = document.getElementById('zone').value;
    const sizeCheckboxes = document.querySelectorAll('#size .btn:checked');
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;
    const areaMin = document.getElementById('area-min').value;
    const areaMax = document.getElementById('area-max').value;

    const sizes = Array.from(sizeCheckboxes).map(cb => cb.value);
    const priceMinNum = priceMin ? parseInt(priceMin, 10) : null;
    const priceMaxNum = priceMax ? parseInt(priceMax, 10) : null;
    const areaMinNum = areaMin ? parseInt(areaMin, 10) : null;
    const areaMaxNum = areaMax ? parseInt(areaMax, 10) : null;

    const filteredData = DATA.filter(item => {
      let isVisible = true;

      if (zone && item.zone !== zone) isVisible = false;
      if (sizes.length > 0 && !sizes.includes(item.size)) isVisible = false;
      if (priceMinNum !== null && item.cost < priceMinNum) isVisible = false;
      if (priceMaxNum !== null && item.cost > priceMaxNum) isVisible = false;
      if (areaMinNum !== null && item.area < areaMinNum) isVisible = false;
      if (areaMaxNum !== null && item.area > areaMaxNum) isVisible = false;

      return isVisible;
    });

    renderGoods(filteredData);

    if (filteredData.length === 0) {
      goodsContainer.classList.add('hidden');
      goodsContainer.style.display = 'none';
    } else {
      goodsContainer.classList.remove('hidden');
      goodsContainer.style.display = 'flex';
    }
  }

  function clearFilters(event) {
    event.preventDefault();
    filters.reset();
    goodsContainer.classList.add('hidden');
    goodsContainer.style.display = 'none';
  }

  showButton.addEventListener('click', filterGoods);
  clearButton.addEventListener('click', clearFilters);

  clearButtonContainer.style.display = 'flex';
});
