/* =========================
   IMAGE LIGHTBOX GALLERY
========================= */
(function () {
  const gallerySections = document.querySelectorAll(".img-sect01");
  const lightbox = document.getElementById("imageLightbox");
  if (!lightbox) return;

  const track = lightbox.querySelector(".lightbox-track");
  const dotsWrap = lightbox.querySelector(".lightbox-dots");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const overlay = lightbox.querySelector(".lightbox-overlay");

  const galleryData = {
    weddings: [
      { src: "/asset/images//wedding-2 (1).jpg", alt: "Wedding ceremony" },
      { src: "/asset/images/wedding-3.webp", alt: "Wedding reception" },
      { src: "/asset/images/wedding-6.webp", alt: "Couple portrait" },
      { src: "/asset/images/wedding-4.webp", alt: "Wedding candid moment" },
      { src: "/asset/images/wedding-2.webp", alt: "Wedding venue" },
    ],
    portraits: [
      { src: "/asset/images/portrait-1.webp", alt: "Studio portrait" },
      {
        src: "/asset/images/portrait-2.webp",
        alt: "Behind the scenes portrait",
      },
      { src: "/asset/images/portrait-3.webp", alt: "Portrait session" },
      { src: "/asset/images/portrait-6.webp", alt: "Portrait client" },
      { src: "/asset/images/portrait-7.webp", alt: "Candid portrait" },
    ],
    landscapes: [
      { src: "/asset/images/landscape-1.webp", alt: "Scenic landscape" },
      { src: "/asset/images/landscape-2.webp", alt: "Outdoor scenery" },
      { src: "/asset/images/landscape-3.webp", alt: "Landscape backdrop" },
      { src: "/asset/images/landscape-4.webp", alt: "Nature shot" },
      { src: "/asset/images/landscape-8.webp", alt: "Outdoor scenery" },
    ],
    maternity: [
      { src: "/asset/images/maternity-1.webp", alt: "Maternity session" },
      { src: "/asset/images/maternity-2.webp", alt: "Maternity portrait" },
      { src: "/asset/images/maternity-3.webp", alt: "Maternity moment" },
      { src: "/asset/images/maternity-6.webp", alt: "Maternity photoshoot" },
      {
        src: "/asset/images/maternity-4.webp",
        alt: "Maternity outdoor shoot",
      },
    ],
    events: [
      { src: "/asset/images/event-1.webp", alt: "Corporate event" },
      { src: "/asset/images/event-2.webp", alt: "Event celebration" },
      { src: "/asset/images/event-4.webp", alt: "Event guests" },
      { src: "/asset/imagesevent-5.webp", alt: "Event moment" },
      { src: "/asset/images/event-7.webp", alt: "Event venue" },
    ],
  };

  let currentSlide = 0;
  let totalSlides = 0;

  function buildSlides(images, category, source = "home") {
    track.innerHTML = "";
    dotsWrap.innerHTML = "";

    images.forEach((img) => {
      const slide = document.createElement("div");
      slide.className = "lightbox-slide";
      slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;
      track.appendChild(slide);
    });

    const ctaSlide = document.createElement("div");
    ctaSlide.className = "lightbox-slide lightbox-slide-cta";

    if (source === "portfolio") {
      /* Already on the full portfolio page — linking back to itself
         doesn't make sense, so invite a booking instead. */
      ctaSlide.innerHTML = `
  <div class="lightbox-cta-content">
    <h3>More Moments Coming Soon</h3>
    <p>This collection is growing, with new sessions added regularly. If you like what you see, let's plan your own shoot next.</p>
    <a href="https://wa.me/7056343057" class="lightbox-cta-btn">BOOK A SESSION <span>→</span></a>
  </div>`;
    } else {
      ctaSlide.innerHTML = `
  <div class="lightbox-cta-content">
    <h3>Want to see more?</h3>
    <p>Explore the full portfolio for more stunning shots from this collection.</p>
    <a href="/portfolio.html#${category}" class="lightbox-cta-btn">VIEW FULL PORTFOLIO <span>→</span></a>
  </div>`;
    }

    track.appendChild(ctaSlide);

    totalSlides = images.length + 1;

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.className = "lightbox-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goToSlide(i));
      dotsWrap.appendChild(dot);
    }
  }
  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsWrap.querySelectorAll(".lightbox-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function openLightbox(images, category, startIndex = 0, source = "home") {
    buildSlides(images, category, source);
    currentSlide = 0;
    goToSlide(startIndex);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  gallerySections.forEach((section) => {
    section.addEventListener("click", () => {
      const category = section.dataset.gallery;
      if (category && galleryData[category]) {
        openLightbox(galleryData[category], category, 0, "home");
      }
    });
  });

  /* ===== Services-section galleries (portfolio.html) ===== */
  const portfolioSliders = document.querySelectorAll(
    ".gallery-slider[data-slider]",
  );

  portfolioSliders.forEach((slider) => {
    const category = slider.dataset.slider;
    const items = Array.from(slider.querySelectorAll(".gallery-item"));

    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        const total = items.length;
        const windowSize = Math.min(10, total);

        let start = index;
        if (start + windowSize > total) start = total - windowSize;
        if (start < 0) start = 0;

        const windowItems = items.slice(start, start + windowSize);
        const images = windowItems.map((el) => {
          const img = el.querySelector("img");
          return {
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt") || "",
          };
        });

        const startIndex = index - start;
        openLightbox(images, category, startIndex, "portfolio");
      });
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));
  prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
    if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
  });

  /* Touch / swipe for lightbox */
  let lbTouchStartX = 0;
  let lbTouchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    lbTouchStartX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    lbTouchEndX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    const distance = lbTouchStartX - lbTouchEndX;
    if (distance > 50) goToSlide(currentSlide + 1);
    if (distance < -50) goToSlide(currentSlide - 1);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".gallery-slider");

  sliders.forEach((slider) => {
    const track = slider.querySelector(".gallery-track");
    if (!track) return;

    let autoTimer;
    let currentIndex = 0;

    function stepDistance() {
      const item = track.querySelector(".gallery-item");
      if (!item) return 300;
      const gap = parseInt(window.getComputedStyle(track).gap) || 20;
      return item.offsetWidth + gap;
    }

    function itemCount() {
      return track.querySelectorAll(".gallery-item").length;
    }

    function advanceSlide() {
      const count = itemCount();
      if (!count) return;

      currentIndex++;

      const maxScroll = track.scrollWidth - track.clientWidth;

      if (currentIndex >= count || track.scrollLeft >= maxScroll - 5) {
        currentIndex = 0;
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: stepDistance(), behavior: "smooth" });
      }
    }

    function startAutoSlide() {
      clearInterval(autoTimer);
      autoTimer = setInterval(advanceSlide, 3500);
    }

    function pauseAutoSlide() {
      clearInterval(autoTimer);
    }

    function resumeAutoSlide() {
      startAutoSlide();
    }

    /* Mouse drag-to-scroll on desktop */
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      track.classList.add("dragging");
      startX = e.pageX;
      startScroll = track.scrollLeft;
      pauseAutoSlide();
    });

    ["mouseleave", "mouseup"].forEach((evt) => {
      track.addEventListener(evt, () => {
        isDown = false;
        track.classList.remove("dragging");
        resumeAutoSlide();
      });
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const walk = (e.pageX - startX) * 1.2;
      track.scrollLeft = startScroll - walk;
    });

    /* Touch / swipe support */
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      pauseAutoSlide();
    });

    track.addEventListener("touchmove", (e) => {
      touchEndX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", () => {
      const distance = touchStartX - touchEndX;

      if (distance > 50) {
        track.scrollBy({ left: stepDistance(), behavior: "smooth" });
      } else if (distance < -50) {
        track.scrollBy({ left: -stepDistance(), behavior: "smooth" });
      }

      resumeAutoSlide();
    });

    startAutoSlide();
  });

  /* Continue where the visitor left off: if they arrived from the
     home page lightbox with a category anchor (e.g. #weddings),
     scroll straight to that gallery. */
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }
});