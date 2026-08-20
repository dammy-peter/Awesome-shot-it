const slider = document.querySelector(".img-container");
const slides = document.querySelectorAll(".img-sect01");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let autoSlide;

function showSlide(index) {
  currentSlide = index;

  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
}

/* =========================
   AUTO SLIDE
========================= */

function startAutoSlide() {
  clearInterval(autoSlide);

  autoSlide = setInterval(() => {
    nextSlide();
  }, 4000);
}

function resetAutoSlide() {
  startAutoSlide();
}

/* =========================
   ARROW CONTROLS
========================= */

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

/* =========================
   DOT CONTROLS
========================= */

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetAutoSlide();
  });
});

/* =========================
   TOUCH / SWIPE CONTROL
========================= */

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;

  // Stop automatic movement while touching
  clearInterval(autoSlide);
});

slider.addEventListener("touchmove", (e) => {
  touchEndX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
  const swipeDistance = touchStartX - touchEndX;

  // Swipe left → next slide
  if (swipeDistance > 50) {
    nextSlide();
  }

  // Swipe right → previous slide
  if (swipeDistance < -50) {
    prevSlide();
  }

  // Start automatic movement again
  resetAutoSlide();
});

/* Start automatic slider */
startAutoSlide();

