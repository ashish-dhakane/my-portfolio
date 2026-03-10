// =============================================
// TYPING ANIMATION
// Cycles through the words[] array in the hero subtitle.
// To change what gets typed: edit the words array below.
// =============================================
const words = [
  "AI-powered Web Apps",
  "IoT Solutions",
  "Smart Dashboards",
  "Full-Stack Projects"
];

let wordIndex  = 0;   // which word we're on
let charIndex  = 0;   // how far into the word we've typed
let isDeleting = false;

function type() {
  const typedEl = document.getElementById("typed-text");
  if (!typedEl) return;

  const currentWord = words[wordIndex];

  // Add or remove one character depending on direction
  typedEl.textContent = isDeleting
    ? currentWord.substring(0, charIndex - 1)
    : currentWord.substring(0, charIndex + 1);

  isDeleting ? charIndex-- : charIndex++;

  // When word is fully typed: pause then start deleting
  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => { isDeleting = true; type(); }, 1800);
    return;
  }

  // When word is fully deleted: move to next word
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  // Speed: faster when deleting, slower when typing
  setTimeout(type, isDeleting ? 60 : 110);
}

// Start typing after a short delay
setTimeout(type, 500);


// =============================================
// SMOOTH SCROLL FOR NAV LINKS
// Intercepts anchor clicks and scrolls smoothly.
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });

    // Close mobile menu if open after clicking a link
    document.getElementById('navMenu')?.classList.remove('open');
  });
});


// =============================================
// SCROLL TO TOP BUTTON
// Shows after scrolling 300px, hides above it.
// =============================================
const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 300);
});

scrollBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// =============================================
// HAMBURGER MENU (MOBILE)
// Toggles .open class on the nav menu.
// =============================================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});


// =============================================
// CERTIFICATION POPUP
// Opens/closes the cert popup modal.
// =============================================
const certCard  = document.getElementById('cert-card');
const certPopup = document.getElementById('cert-popup');
const closeBtn  = document.getElementById('close-popup');

// Open on card click
certCard?.addEventListener('click', () => {
  certPopup.style.display = 'flex';
});

// Close on X button click
closeBtn?.addEventListener('click', () => {
  certPopup.style.display = 'none';
});

// Close when clicking outside the popup content
window.addEventListener('click', (e) => {
  if (e.target === certPopup) certPopup.style.display = 'none';
});

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close cert popup if open
    if (certPopup) certPopup.style.display = 'none';
    // Close zoomed image if open
    document.querySelector('.img-zoom-overlay')?.remove();
  }
});


// =============================================
// CERTIFICATE IMAGE ZOOM (LIGHTBOX)
// Clicking any cert image opens it fullscreen.
// Clicking the overlay or pressing Escape closes it.
// =============================================
document.querySelectorAll('.cert-images img').forEach(img => {
  img.addEventListener('click', () => {
    // Create fullscreen overlay
    const overlay = document.createElement('div');
    overlay.className = 'img-zoom-overlay';

    // Create enlarged image
    const zoomImg = document.createElement('img');
    zoomImg.src = img.src;
    zoomImg.alt = img.alt;

    overlay.appendChild(zoomImg);
    document.body.appendChild(overlay);

    // Click overlay to close
    overlay.addEventListener('click', () => overlay.remove());
  });
});


// =============================================
// DARK MODE TOGGLE
// Toggles "dark" class on <body> and saves preference to localStorage.
// On page load, restores the saved preference.
// =============================================
const themeToggle = document.getElementById('themeToggle');

// Restore saved theme on load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  if (themeToggle) themeToggle.textContent = '☀️';
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// =============================================
// CONTACT FORM — EmailJS + Google Sheets
//
// SETUP REQUIRED (read the guide below):
//   1. Replace YOUR_PUBLIC_KEY with your EmailJS public key
//   2. Replace YOUR_SERVICE_ID with your EmailJS service ID
//   3. Replace YOUR_TEMPLATE_ID with your EmailJS template ID
//   4. Replace YOUR_GOOGLE_SCRIPT_URL with your Apps Script URL
//
// Full setup guide is in SETUP-GUIDE.txt
// =============================================

// ── CONFIGURATION: Edit these 4 values after setup ──
const EMAILJS_PUBLIC_KEY   = "Q-239OXyXuH97IbuF";       // from EmailJS dashboard
const EMAILJS_SERVICE_ID   = "service_lv7hb5o";       // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID  = "template_pa4hjfe";      // e.g. "template_xyz789"
const GOOGLE_SCRIPT_URL    = "https://script.google.com/macros/s/AKfycbwUgcXINsjPB8dQAyjWXnYGWiIU05eeVpeXCXrbynK1cgMVvPQjHiL7qtVwh7bLTurz2Q/exec";// from Apps Script deployment


// ── Initialize EmailJS ──
// This runs as soon as the script loads
(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();


// ── Form Submit Handler ──
const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Validate form first — stop if invalid
  if (!validateForm()) return;

  // Get field values
  const name    = document.getElementById("cf-name").value.trim();
  const email   = document.getElementById("cf-email").value.trim();
  const phone   = document.getElementById("cf-phone").value.trim() || "Not provided";
  const topic   = document.getElementById("cf-topic").value;
  const message = document.getElementById("cf-message").value.trim();

  // Get current date and time (India format)
  const now       = new Date();
  const dateStr   = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr   = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const datetime  = `${dateStr} at ${timeStr}`;

  // Show loading state on button
  setLoading(true);
  hideMessages();

  try {
    // ── Step 1: Send email via EmailJS ──
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      phone:      phone,
      topic:      topic,
      message:    message,
      date_time:  datetime,
      // This goes to your email — set reply_to in EmailJS template
      to_name:    "Ashish"
    });

    // ── Step 2: Save to Google Sheets ──
    // This runs in the background — form success doesn't depend on it
    saveToGoogleSheets({ name, email, phone, topic, datetime });

    // Show success message and reset form
    showSuccess();
    contactForm.reset();

  } catch (err) {
    console.error("Form submission error:", err);
    showError();
  } finally {
    setLoading(false);
  }
});


// ── Save to Google Sheets via Apps Script ──
// Sends data as a POST request to your deployed Google Apps Script
async function saveToGoogleSheets(data) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      // Google Apps Script requires text/plain (not application/json) for no-cors
      headers: { "Content-Type": "text/plain" },
      mode: "no-cors",
      body: JSON.stringify(data)
    });
  } catch (err) {
    // Silent fail — email was already sent, sheet save is secondary
    console.warn("Google Sheets save failed (non-critical):", err);
  }
}


// ── Form Validation ──
// Returns true if all required fields are valid
function validateForm() {
  let valid = true;

  const name    = document.getElementById("cf-name");
  const email   = document.getElementById("cf-email");
  const topic   = document.getElementById("cf-topic");
  const message = document.getElementById("cf-message");

  // Clear previous errors
  clearErrors();

  // Name: must not be empty
  if (!name.value.trim()) {
    showFieldError("cf-name", "err-name");
    valid = false;
  }

  // Email: must match basic email pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showFieldError("cf-email", "err-email");
    valid = false;
  }

  // Topic: must have a selection
  if (!topic.value) {
    showFieldError("cf-topic", "err-topic");
    valid = false;
  }

  // Message: must not be empty
  if (!message.value.trim()) {
    showFieldError("cf-message", "err-message");
    valid = false;
  }

  return valid;
}

// Marks a field as invalid and shows its error message
function showFieldError(inputId, errorId) {
  document.getElementById(inputId)?.classList.add("invalid");
  document.getElementById(errorId)?.classList.add("show");
}

// Clears all validation errors
function clearErrors() {
  document.querySelectorAll(".contact-form input, .contact-form select, .contact-form textarea")
    .forEach(el => el.classList.remove("invalid"));
  document.querySelectorAll(".field-error")
    .forEach(el => el.classList.remove("show"));
}

// Remove error on field when user starts typing
["cf-name", "cf-email", "cf-phone", "cf-topic", "cf-message"].forEach(id => {
  document.getElementById(id)?.addEventListener("input", () => {
    document.getElementById(id)?.classList.remove("invalid");
    // Hide corresponding error
    const errMap = {
      "cf-name": "err-name", "cf-email": "err-email",
      "cf-topic": "err-topic", "cf-message": "err-message"
    };
    if (errMap[id]) document.getElementById(errMap[id])?.classList.remove("show");
  });
});


// ── UI State Helpers ──

function setLoading(isLoading) {
  const btn     = document.getElementById("submitBtn");
  const text    = document.getElementById("btn-text");
  const loading = document.getElementById("btn-loading");
  if (!btn) return;
  btn.disabled     = isLoading;
  text.style.display    = isLoading ? "none"   : "flex";
  loading.style.display = isLoading ? "flex"   : "none";
}

function showSuccess() {
  document.getElementById("form-success")?.classList.add("show");
}

function showError() {
  document.getElementById("form-error")?.classList.add("show");
}

function hideMessages() {
  document.getElementById("form-success")?.classList.remove("show");
  document.getElementById("form-error")?.classList.remove("show");
}
