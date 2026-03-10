# Ashish Dhakane — Personal Portfolio

A clean, modern, and responsive personal portfolio website built with **HTML, CSS, and JavaScript**. Deployed on Vercel.

🔗 **Live Site:** [ashish-portfolio-eta.vercel.app]()

---

## 🚀 Features

- Responsive design (mobile, tablet, desktop)
- Dark / Light mode toggle
- Typing animation in hero section
- Skills grouped by category
- Project cards with live links and tech tags
- Certifications popup with image zoom
- Contact form with EmailJS (email notifications) and Google Sheets (auto data logging)
- Smooth scroll and scroll-to-top button

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| HTML5 | Structure |
| CSS3 | Styling, animations, dark mode |
| JavaScript (Vanilla) | Interactivity, form handling |
| EmailJS | Contact form email notifications |
| Google Apps Script | Auto-save form data to Google Sheets |
| Vercel | Deployment |

---

## 📁 Project Structure

```
ashish-portfolio-main/
└── public/
    ├── index.html              # Main HTML file
    ├── style.css               # All styles
    ├── script.js               # All JavaScript
    ├── Ashish Dhakane resume.pdf
    ├── cert1.jpg – cert13.jpg  # Certificate images
    └── vercel.json             # Vercel config
```

---

## ⚙️ Setup & Deployment

### 1. Clone the repo
```bash
git clone https://github.com/ashish-dhakane/ashish-portfolio.git
cd ashish-portfolio
```

### 2. Configure the contact form
Open `public/script.js` and fill in your credentials:
```js
const EMAILJS_PUBLIC_KEY  = "your_key";
const EMAILJS_SERVICE_ID  = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const GOOGLE_SCRIPT_URL   = "your_apps_script_url";
```
> See `SETUP-GUIDE.txt` for full step-by-step instructions.

### 3. Deploy on Vercel
Push to GitHub and connect the repo on [vercel.com](https://vercel.com). Vercel auto-deploys on every push.

---

## 📬 Contact

**Ashish Dhakane**
- Email: [dhakneashish110@gmail.com](mailto:dhakneashish110@gmail.com)
- GitHub: [@ashish-dhakane](https://github.com/ashish-dhakane)
- LinkedIn: [Ashish Dhakane](https://www.linkedin.com/in/ashish-dhakane-971935289/)

---

> Built with 💚 by Ashish Dhakane
