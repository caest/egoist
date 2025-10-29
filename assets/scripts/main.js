document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header-mobile-burger");
const closeBtn = document.querySelector(".header-mobile-close");
const mobileHeader = document.querySelector(".header-mobile");
const mobileButton = document.querySelector(".header-mobile-button");

if (burger && closeBtn && mobileHeader && mobileButton) {
  burger.addEventListener("click", () => {
    mobileHeader.classList.add("active");
    mobileButton.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    mobileHeader.classList.remove("active");
    mobileButton.classList.remove("active");
  });
}

  // === Swiper слайдер ===
const sliderEl = document.querySelector(".dream__slider");
if (sliderEl) {
  const dreamSlider = new Swiper(sliderEl, {
    slidesPerView: 3,
    loop: true,
    pagination: {
      el: sliderEl.querySelector(".dream__slider-pagination"),
      type: "fraction",
      formatFractionCurrent: (num) => (num < 10 ? `0${num}` : num),
      formatFractionTotal: (num) => (num < 10 ? `0${num}` : num),
    },
    navigation: {
      nextEl: sliderEl.querySelector(".dream__slider-next"),
      prevEl: sliderEl.querySelector(".dream__slider-prev"),
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      720: {
        slidesPerView: 2,
        spaceBetween: 15,
      },

      1480: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    },
    on: {
      slideChange(swiper) {
        const slides = sliderEl.querySelectorAll(".swiper-slide");
        slides.forEach((slide) => slide.classList.remove("is-active"));
        if (slides[swiper.realIndex])
          slides[swiper.realIndex].classList.add("is-active");
      },
    },
  });

  const swiperSlides = sliderEl.querySelectorAll(".swiper-slide");
  if (swiperSlides.length > 0) swiperSlides[0].classList.add("is-active");
}


const galleryEl = document.querySelector(".object-gallery");
if (galleryEl) {
  const objectGallery = new Swiper(galleryEl, {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: galleryEl.querySelector(".object-gallery-pagination"),
      type: "fraction",
      formatFractionCurrent: (num) => (num < 10 ? `0${num}` : num),
      formatFractionTotal: (num) => (num < 10 ? `0${num}` : num),
    },
    navigation: {
      nextEl: galleryEl.querySelector(".object-gallery-next"),
      prevEl: galleryEl.querySelector(".object-gallery-prev"),
    },
    on: {
      slideChange(swiper) {
        const slides = galleryEl.querySelectorAll(".swiper-slide");
        slides.forEach((slide) => slide.classList.remove("is-active"));
        if (slides[swiper.realIndex])
          slides[swiper.realIndex].classList.add("is-active");
      },
    },
  });

  const swiperSlides = galleryEl.querySelectorAll(".swiper-slide");
  if (swiperSlides.length > 0) swiperSlides[0].classList.add("is-active");
}


  // === Кнопки "favorite" ===
  const favoriteButtons = document.querySelectorAll(".product-card__favorite-btn");
  if (favoriteButtons.length > 0) {
    favoriteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        btn.classList.toggle("is-active");
        btn.dispatchEvent(
          new CustomEvent("favorite:toggle", {
            detail: { active: btn.classList.contains("is-active") },
            bubbles: true,
          })
        );
      });
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // === Premium слайдер ===
  const premiumSlider = document.querySelector(".premium-slider");
  if (premiumSlider) {
    const premiumSlides = premiumSlider.querySelectorAll(".premium-slide");
    const prevBtn = document.querySelector(".premium-slider-prev");
    const nextBtn = document.querySelector(".premium-slider-next");
    const pagination = document.querySelector(".premium-slider-pagination");

    let current = 0;

    function updatePremiumSlider() {
      premiumSlides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${current * 100}%)`;
        slide.classList.toggle("is-active", index === current);
      });
      if (pagination) {
        pagination.textContent = `${current + 1}/${premiumSlides.length}`;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        current = (current - 1 + premiumSlides.length) % premiumSlides.length;
        updatePremiumSlider();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        current = (current + 1) % premiumSlides.length;
        updatePremiumSlider();
      });
    }

    updatePremiumSlider();
  }

  // === Panorama слайдер ===
  const panoramaEl = document.querySelector(".panorama-slider");
  if (panoramaEl) {
    const panoramaSlider = new Swiper(panoramaEl, {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: panoramaEl.querySelector(".panorama-slider-next"),
        prevEl: panoramaEl.querySelector(".panorama-slider-prev"),
      },
      pagination: {
        el: panoramaEl.querySelector(".panorama-slider-pagination"),
        type: "fraction",
        formatFractionCurrent: (num) => (num < 10 ? `0${num}` : num),
        formatFractionTotal: (num) => (num < 10 ? `0${num}` : num),
      },
      on: {
        slideChange(swiper) {
          panoramaEl.querySelectorAll(".swiper-slide").forEach(slide => slide.classList.remove("is-active"));
          panoramaEl.querySelectorAll(".swiper-slide")[swiper.realIndex]?.classList.add("is-active");
        },
      },
    });

    panoramaEl.querySelectorAll(".swiper-slide")[0]?.classList.add("is-active");
  }

  // === Price range slider ===
  const rangeInputs = document.querySelectorAll(".catalog-range input");
  const progress = document.querySelector(".catalog-progress");
  const priceInputs = document.querySelectorAll(".catalog-input-container input");

  if (rangeInputs.length > 0 && progress && priceInputs.length > 0) {
    const minLimit = 45000;
    const maxLimit = 250000000;
    const gap = 10000;

    function updateProgress() {
      const minVal = parseInt(rangeInputs[0].value);
      const maxVal = parseInt(rangeInputs[1].value);
      progress.style.left = ((minVal - minLimit) / (maxLimit - minLimit)) * 100 + "%";
      progress.style.right = 100 - ((maxVal - minLimit) / (maxLimit - minLimit)) * 100 + "%";
    }

    updateProgress();

    rangeInputs.forEach(input => {
      input.addEventListener("input", e => {
        let minVal = parseInt(rangeInputs[0].value);
        let maxVal = parseInt(rangeInputs[1].value);

        if (maxVal - minVal < gap) {
          if (e.target.classList.contains("range-min")) {
            rangeInputs[0].value = maxVal - gap;
          } else {
            rangeInputs[1].value = minVal + gap;
          }
        } else {
          priceInputs[0].value = minVal;
          priceInputs[1].value = maxVal;
          updateProgress();
        }
      });
    });

    priceInputs.forEach(input => {
      input.addEventListener("input", e => {
        let minPrice = parseInt(priceInputs[0].value);
        let maxPrice = parseInt(priceInputs[1].value);

        if (maxPrice - minPrice >= gap && maxPrice <= maxLimit && minPrice >= minLimit) {
          if (e.target === priceInputs[0]) {
            rangeInputs[0].value = minPrice;
          } else {
            rangeInputs[1].value = maxPrice;
          }
          updateProgress();
        }
      });
    });
  }

  // === Filters ===
  const filtersContainer = document.querySelector(".catalog-filter-container");
  const filterBtn = document.querySelector(".catalog-filter-btn");
  const filterBlocks = document.querySelectorAll(".catalog-filter");
  const sortBlock = document.querySelector(".filter-sort");

  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      filtersContainer.classList.toggle("active");
      filterBtn.classList.toggle("active");
    });
  }

  filterBlocks.forEach(filter => {
    const top = filter.querySelector(".catalog-filter-top");
    if (top) {
      top.addEventListener("click", e => {
        if (e.target.closest(".catalog-filter-variant")) return;
        const isOpen = filter.classList.contains("open");
        document.querySelectorAll(".catalog-filter.open").forEach(f => f.classList.remove("open"));
        if (!isOpen) filter.classList.add("open");
      });
      
      document.addEventListener("click", e => {
        if (!filter.contains(e.target)) filter.classList.remove("open");
      });
    }
  });

  document.querySelectorAll(".catalog-filter-variant").forEach(variant => {
    variant.addEventListener("click", () => {
      const parent = variant.closest(".catalog-filter-variants");
      if (parent) {
        parent.querySelectorAll(".catalog-filter-variant").forEach(v => v.classList.remove("active"));
        variant.classList.add("active");
        variant.closest(".catalog-filter").classList.remove("open");
      }
    });
  });

  if (sortBlock) {
    const top = sortBlock.querySelector(".catalog-filter-top");
    if (top) {
      top.addEventListener("click", e => {
        const isOpen = sortBlock.classList.contains("open");
        document.querySelectorAll(".filter-sort.open").forEach(f => f.classList.remove("open"));
        if (!isOpen) sortBlock.classList.add("open");
      });
      
      document.addEventListener("click", e => {
        if (!sortBlock.contains(e.target)) sortBlock.classList.remove("open");
      });
      
      sortBlock.querySelectorAll(".catalog-filter-variant").forEach(v => {
        v.addEventListener("click", () => {
          sortBlock.querySelectorAll(".catalog-filter-variant").forEach(el => el.classList.remove("active"));
          v.classList.add("active");
          sortBlock.classList.remove("open");
        });
      });
    }
  }

  // === Filters popup ===
  const filtersPopup = document.querySelector(".filters-popup");
  const filtersClose = document.querySelector(".filters-popup-close");

  if (filterBtn && filtersPopup && filtersClose) {
    filterBtn.addEventListener("click", () => {
      filtersPopup.classList.add("active");
      document.body.classList.add("no-scroll");
    });

    filtersClose.addEventListener("click", () => {
      filtersPopup.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });

    filtersPopup.addEventListener("click", e => {
      if (e.target === filtersPopup) {
        filtersPopup.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  const filterContainers = document.querySelectorAll(".filter-container");

  filterContainers.forEach(container => {
    const top = container.querySelector(".filter-container-top");
    const body = container.querySelector(".filter-container-body");
    const choice = container.querySelector(".filter-choice");

    if (top && body && choice) {
      top.addEventListener("click", () => {
        container.classList.toggle("open");
      });

      body.querySelectorAll(".filter-container-item").forEach(item => {
        item.addEventListener("click", () => {
          choice.textContent = item.textContent;
          container.classList.remove("open");
        });
      });

      const rangeMin = body.querySelector(".range-min");
      const rangeMax = body.querySelector(".range-max");
      const inputMin = body.querySelector(".min-price");
      const inputMax = body.querySelector(".max-price");
      const progress = body.querySelector(".catalog-progress");

      if (rangeMin && rangeMax && inputMin && inputMax && progress) {
        const minLimit = parseInt(rangeMin.min);
        const maxLimit = parseInt(rangeMax.max);
        const gap = 10000;

        function updateChoice() {
          choice.textContent = `${inputMin.value}€ — ${inputMax.value}€`;
        }

        function updateProgress() {
          const minVal = parseInt(rangeMin.value);
          const maxVal = parseInt(rangeMax.value);
          progress.style.left = ((minVal - minLimit) / (maxLimit - minLimit)) * 100 + "%";
          progress.style.right = 100 - ((maxVal - minLimit) / (maxLimit - minLimit)) * 100 + "%";
        }

        const syncRangeToInput = () => {
          let minVal = parseInt(rangeMin.value);
          let maxVal = parseInt(rangeMax.value);
          if (maxVal - minVal < gap) {
            if (document.activeElement === rangeMin) minVal = maxVal - gap;
            else maxVal = minVal + gap;
          }
          rangeMin.value = minVal;
          rangeMax.value = maxVal;
          inputMin.value = minVal;
          inputMax.value = maxVal;
          updateProgress();
          updateChoice();
        };

        rangeMin.addEventListener("input", syncRangeToInput);
        rangeMax.addEventListener("input", syncRangeToInput);

        const syncInputToRange = () => {
          let minVal = parseInt(inputMin.value);
          let maxVal = parseInt(inputMax.value);
          if (maxVal - minVal < gap) {
            if (document.activeElement === inputMin) minVal = maxVal - gap;
            else maxVal = minVal + gap;
          }
          if (minVal < minLimit) minVal = minLimit;
          if (maxVal > maxLimit) maxVal = maxLimit;
          inputMin.value = minVal;
          inputMax.value = maxVal;
          rangeMin.value = minVal;
          rangeMax.value = maxVal;
          updateProgress();
          updateChoice();
        };

        inputMin.addEventListener("input", syncInputToRange);
        inputMax.addEventListener("input", syncInputToRange);

        updateProgress();
        updateChoice();
      }
    }
  });

  // === Catalog Pagination ===
  class CatalogPagination {
    constructor() {
      this.currentPage = 1;
      this.itemsPerPage = 9;
      this.totalItems = 0;
      this.totalPages = 0;
      this.init();
    }

    init() {
      this.catalogList = document.querySelector('.catalog-list');
      this.catalogItems = document.querySelectorAll('.catalog-item');
      this.prevBtn = document.querySelector('.catalog-controls-prev');
      this.nextBtn = document.querySelector('.catalog-controls-next');
      this.currentPageEl = document.querySelector('.catalog-fraction-current');
      this.totalPagesEl = document.querySelector('.catalog-fraction-pages');

      // Проверяем, что все необходимые элементы существуют
      if (!this.catalogItems.length || !this.prevBtn || !this.nextBtn || !this.currentPageEl || !this.totalPagesEl) {
        console.warn('Pagination elements not found');
        return;
      }

      this.totalItems = this.catalogItems.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

      this.updatePaginationInfo();
      this.showCurrentPage();
      this.setupEventListeners();
    }

    setupEventListeners() {
      this.prevBtn.addEventListener('click', () => this.previousPage());
      this.nextBtn.addEventListener('click', () => this.nextPage());
    }

    updatePaginationInfo() {
      this.currentPageEl.textContent = this.formatPageNumber(this.currentPage);
      this.totalPagesEl.textContent = this.formatPageNumber(this.totalPages);

      this.prevBtn.style.opacity = this.currentPage === 1 ? '0.5' : '1';
      this.nextBtn.style.opacity = this.currentPage === this.totalPages ? '0.5' : '1';

      this.prevBtn.style.pointerEvents = this.currentPage === 1 ? 'none' : 'all';
      this.nextBtn.style.pointerEvents = this.currentPage === this.totalPages ? 'none' : 'all';
    }

    formatPageNumber(number) {
      return number < 10 ? `0${number}` : `${number}`;
    }

    showCurrentPage() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      this.catalogItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.showCurrentPage();
        this.updatePaginationInfo();
        this.scrollToTop();
      }
    }

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.showCurrentPage();
        this.updatePaginationInfo();
        this.scrollToTop();
      }
    }

    scrollToTop() {
      const catalogSection = document.querySelector('.catalog');
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    updateItems(newItems = null) {
      if (newItems) {
        this.catalogItems = newItems;
        this.totalItems = this.catalogItems.length;
      } else {
        this.catalogItems = document.querySelectorAll('.catalog-item');
        this.totalItems = this.catalogItems.length;
      }

      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

      if (this.currentPage > this.totalPages) {
        this.currentPage = Math.max(1, this.totalPages);
      }

      this.showCurrentPage();
      this.updatePaginationInfo();
    }
  }

  // Инициализация пагинации
  const catalogPagination = new CatalogPagination();
  window.catalogPagination = catalogPagination;


document.querySelectorAll(".object-description-wrap").forEach((wrap) => {
  const btn = wrap.querySelector(".object-read-more");
  const fullDesc = wrap.querySelector(".object-full");

  btn.addEventListener("click", () => {
    fullDesc.classList.toggle("expanded");
    btn.textContent = fullDesc.classList.contains("expanded") 
      ? "показать меньше" 
      : "показать больше";
  });
});

const rate = 8;
const price = parseFloat(document.getElementById("priceValue").textContent.replace(/[^\d.]/g, ""));

const downPaymentInput = document.getElementById("downPayment");
const termInput = document.getElementById("term");
const downProgress = document.getElementById("downProgress");
const termProgress = document.getElementById("termProgress");

const calcBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");

const downValue = document.getElementById("downValue");
const termValue = document.getElementById("termValue");
const monthly = document.getElementById("monthly");
const loanAmount = document.getElementById("loanAmount");
const interestSum = document.getElementById("interestSum");
const totalSum = document.getElementById("totalSum");
const quarters = document.getElementById("quarters");

function updateProgress(input, progressEl) {
  const min = input.min;
  const max = input.max;
  const val = input.value;
  const percent = ((val - min) / (max - min)) * 100;
  progressEl.style.width = percent + "%";
}

downPaymentInput.addEventListener("input", () => {
  downValue.textContent = downPaymentInput.value + "%";
  updateProgress(downPaymentInput, downProgress);
});

termInput.addEventListener("input", () => {
  termValue.textContent = termInput.value;
  updateProgress(termInput, termProgress);
});

calcBtn.addEventListener("click", () => {
  const downPercent = downPaymentInput.value / 100;
  const months = Number(termInput.value);
  const principal = price * (1 - downPercent);
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  const totalPayment = monthlyPayment * months;
  const interest = totalPayment - principal;

  loanAmount.textContent = principal.toFixed(0) + " €";
  interestSum.textContent = interest.toFixed(0) + " €";
  totalSum.textContent = totalPayment.toFixed(0) + " €";
  monthly.textContent = "≈ " + monthlyPayment.toFixed(0) + " €";
  quarters.textContent = (months / 3).toFixed(0);
});

resetBtn.addEventListener("click", () => {
  downPaymentInput.value = 50;
  termInput.value = 36;
  downValue.textContent = "50%";
  termValue.textContent = "36";
  updateProgress(downPaymentInput, downProgress);
  updateProgress(termInput, termProgress);
  monthly.textContent = "≈ 0 €";
  loanAmount.textContent = "-";
  interestSum.textContent = "-";
  totalSum.textContent = "-";
  quarters.textContent = "-";
});

// ініціалізація прогресів при завантаженні
updateProgress(downPaymentInput, downProgress);
updateProgress(termInput, termProgress);

});

