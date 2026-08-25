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

/* =========================
   TESTIMONIAL AUTO-SLIDER
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(
    "#testimonialSlider .testimonial"
  );
  const tDots = document.querySelectorAll(
    "#testimonialSlider .t-dot"
  );

  if (!testimonials.length) return;

  let currentTestimonial = 0;
  let testimonialTimer;

  function showTestimonial(index) {
    testimonials.forEach((t) => t.classList.remove("testimonial-active"));
    tDots.forEach((d) => d.classList.remove("active"));

    testimonials[index].classList.add("testimonial-active");
    tDots[index].classList.add("active");

    currentTestimonial = index;
  }

  function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
  }

  function startTestimonialTimer() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(nextTestimonial, 5000);
  }

   /* Touch / swipe for testimonials */
  let tTouchStartX = 0;
  let tTouchEndX = 0;

  const testimonialSlider = document.getElementById("testimonialSlider");

  testimonialSlider.addEventListener("touchstart", (e) => {
    tTouchStartX = e.touches[0].clientX;
    clearInterval(testimonialTimer);
  });

  testimonialSlider.addEventListener("touchmove", (e) => {
    tTouchEndX = e.touches[0].clientX;
  });

  testimonialSlider.addEventListener("touchend", () => {
    const swipeDistance = tTouchStartX - tTouchEndX;

    if (swipeDistance > 50) {
      nextTestimonial();
    }

    if (swipeDistance < -50) {
      const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(prev);
    }

    startTestimonialTimer();
  });

  

  tDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index);
      startTestimonialTimer();
    });
  });

  startTestimonialTimer();
});

 