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

// Contact form handling
// No backend is wired up yet, so on submit we validate the fields
// and hand the message off to WhatsApp (the studio's existing booking channel).

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in your name, email, and message.";
      status.className = "form-status error";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.className = "form-status error";
      return;
    }

    const lines = [
      `New enquiry from ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      service ? `Service: ${service}` : null,
      `Message: ${message}`,
    ].filter(Boolean);

    const whatsappNumber = "7056343057";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    status.textContent = "Opening WhatsApp to send your message...";
    status.className = "form-status success";

    window.open(whatsappUrl, "_blank");
    form.reset();
  });
});