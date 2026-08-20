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