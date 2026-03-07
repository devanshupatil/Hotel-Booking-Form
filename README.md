<div align="center">

# 🏨 The Grand Hotel — Booking Form

A **premium, animated hotel booking form** built with pure HTML, CSS & JavaScript, styled entirely with **Tailwind CSS**.

![Preview](preview.png)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Glassmorphic Card** | Frosted-glass form card with `backdrop-blur` and soft shadow |
| 🌊 **Animated Background** | Floating gradient circles that drift with a smooth 20 s loop |
| ✅ **Real-time Validation** | Inline error messages with shake animation on invalid fields |
| 📅 **Smart Date Logic** | Check-out automatically locks to at least one day after check-in |
| 🎉 **Success Overlay** | Animated confirmation screen with scale-in checkmark |
| 📱 **Fully Responsive** | Graceful single-column layout on mobile, two-column on desktop |
| ⌨️ **Character Counter** | Live character count on the Special Requests textarea (max 300) |
| 🖋️ **Premium Typography** | Playfair Display headings + Poppins body via Google Fonts |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup with accessibility-friendly labels
- **Tailwind CSS v3.4** — Utility-first styling, custom theme with extended colors, fonts & keyframes
- **Vanilla JavaScript** — Zero-dependency form validation & interaction

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/devanshupatil/Hotel-Booking-Form.git
cd Hotel-Booking-Form

# 2. Install dependencies
npm install

# 3. Build the Tailwind CSS output
npm run build:css
```

### Development

Start the Tailwind watcher to recompile CSS on every save:

```bash
npm run watch:css
```

Then open `index.html` in your browser (or use the Live Server extension in VS Code).

---

## 📁 Project Structure

```
Hotel-Booking-Form/
├── css/
│   ├── input.css        # Tailwind directives & custom utilities
│   └── styles.css       # Compiled Tailwind output (generated)
├── js/
│   └── script.js        # Form validation & interaction logic
├── index.html           # Main HTML page
├── tailwind.config.js   # Custom theme — colors, fonts, animations
├── package.json         # Scripts & dev dependencies
└── README.md
```

---

## 🎨 Design Tokens

The custom theme is defined in `tailwind.config.js`:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#1a365d` | Headings, labels, button gradient |
| `primary-light` | `#2d4a7c` | Gradient end, background |
| `accent` | `#d4a853` | Focus rings, "Welcome to" text |
| `font-playfair` | Playfair Display | Headings & titles |
| `font-poppins` | Poppins | Body text & inputs |

---

## 📸 Screenshots

<div align="center">

### Booking Form
![Booking Form](preview.png)

</div>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** this repository
2. Create your feature branch — `git checkout -b feat/amazing-feature`
3. Commit your changes — `git commit -m "feat: add amazing feature"`
4. Push to the branch — `git push origin feat/amazing-feature`
5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with ❤️ by **Devanshu Patil**

</div>
