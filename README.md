# One Page Demo – Cliente Demo

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![UI/UX](https://img.shields.io/badge/UI%2FUX-Custom%20Experience-ff69b4)

A modern, visually engaging one‑page landing page template with a full‑screen image background per section, smooth scroll navigation, integrated appointment booking (via Tally), and two enhanced UX features: **custom cursor** and **smart preloader**.

> This version includes upgrades contributed to the original project: a preloader with progress bar + LCP‑aware timing, and a smooth following custom cursor with interactive hover effects.

## ✨ Features

- **Full‑screen sections** with parallax‑style zoom on hover.
- **Fixed navigation bar** with smooth anchor scrolling for seamless transitions.
- **Tally‑powered appointment modal** – integrated booking form accessible via primary CTA buttons.
- **Floating Utilities** – includes a WhatsApp floating contact button and a back‑to‑top shortcut.
- **Custom Cursor** – a minimal white circle that utilizes `mix-blend-mode` for visibility, expanding and changing color on interactive elements. Automatically disabled on touch devices.
- **Smart Preloader** – features an animated ✨ icon, a progress bar, and a percentage counter.
  - **LCP-Aware**: Uses `PerformanceObserver` to detect the Largest Contentful Paint before clearing.
  - **Resource Detection**: Monitors images, stylesheets, and script loading states.
  - **Timing**: Guaranteed minimum display of 1.5s to avoid visual flickering, followed by a smooth 2s fade-out.

## 🛠️ Tech Stack

- **HTML5 / CSS3** (Vanilla implementation).
- **JavaScript (ES6)** – high-performance logic with no external dependencies for core features.
- **Tally.so** – used for the seamless pop‑up booking experience.
- **Unsplash API** – high-resolution imagery served via CDN for optimized performance.

## 📁 Project Structure

```text
demo-cliente/
├── index.html          # Main entry point & layout
├── css/
│   ├── style.css       # Core layout, section parallax, and typography
│   └── features.css    # Preloader, custom cursor, and interactive animations
└── js/
    ├── script.js       # Basic UI logic (Back-to-top, Tally init)
    └── features.js     # Advanced logic (LCP detection, Resource monitoring, Lerp Cursor)
```

## 🚀 How to Use Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/affan675/demo-cliente.git
   ```
2. **Open the project:**
   Simply open `index.html` in any modern web browser. No build steps or local servers are required, though a local server is recommended for testing performance APIs.

> **Pro Tip:** To see the preloader logic in action on a fast connection, use Chrome DevTools to simulate "Slow 3G" in the Network tab.

## 🧩 Customisation

- **Background images**: Edit the `background-image` URLs inside `css/style.css` under the `#sectionN::before` selectors.
- **Preloader text**: Modify the `.loading-text` paragraph within the `index.html` file.
- **Timing**: Adjust the `minDisplayTime` variable (in milliseconds) within `js/features.js` to change how long the brand icon stays visible.
- **Cursor Branding**: Modify the `--accent` CSS variable in `css/style.css` to update the cursor hover color globally.

## 📝 Notes on the Upgrades

### Custom Cursor
- Replaces the default pointer with a 20px circle using linear interpolation (lerp) for smooth movement.
- Uses `mix-blend-mode: difference` to ensure high contrast regardless of the background image brightness.
- Expansion effect triggers on all interactive selectors: `a`, `button`, `.btn-turno`, `.whatsapp-float`.

### Smart Preloader
- **Progress Logic**: The bar increments smoothly to 95% using a fake interval, while the remaining 5% is gated by actual resource completion.
- **Performance Driven**: By waiting for the `largest-contentful-paint` entry, we ensure the user never sees an unstyled or half-loaded hero section.
- **Safety Fallback**: Includes a 4-second hard timeout to ensure the site remains accessible even if a specific resource fails to report its load state.

## 🤝 Contributing

This repository is a fork of `robsanabria/demo-cliente`.

If you'd like to propose further improvements, such as:
- Lazy loading for background images.
- Support for multiple cursor themes.
- Additional preloader animations.

Please feel free to open an issue or submit a pull request!

## 📄 License

© 2026 – All rights reserved (original demo project).
Upgrades contributed by **affan675** under the same licensing terms as the original repository.

---
*Live preview available by opening index.html – Enjoy the smooth experience!*