document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const originalButtonText = "Send message";
  contactSubmit.disabled = true;
  contactSubmit.textContent = "Sending...";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      contactForm.reset();
      formStatus.textContent = "Thank you! Your message has been sent successfully. We'll get back to you as soon as possible.";
      formStatus.classList.add("success");
      contactSubmit.textContent = "Message sent";

      setTimeout(() => {
        contactSubmit.textContent = originalButtonText;
        contactSubmit.disabled = false;
      }, 2500);
    } else {
      formStatus.textContent = "Something went wrong. Please email us directly at info@nexosbookkeeping.com.";
      formStatus.classList.add("error");
      contactSubmit.textContent = originalButtonText;
      contactSubmit.disabled = false;
    }
  } catch (error) {
    formStatus.textContent = "Something went wrong. Please email us directly at info@nexosbookkeeping.com.";
    formStatus.classList.add("error");
    contactSubmit.textContent = originalButtonText;
    contactSubmit.disabled = false;
  }
});
