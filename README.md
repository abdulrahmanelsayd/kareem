# Kareem Adawy — Premium Contracting Portfolio

A cinematic, ultra-premium portfolio website for **Kareem Adawy Contracting** — showcasing luxury interior finishing and contracting projects with a museum-grade web experience.

> 🇪🇬 Built RTL-first for Arabic audiences.

## ✨ Features

- **Cinematic hero** with autoplay video and editorial typography
- **Before / After slider** — drag to compare project transformations
- **Horizontal cinema gallery** with lightbox and keyboard navigation
- **Project timelines** — animated phase-by-phase construction milestones
- **Fully responsive** — premium experience on mobile, tablet, and desktop
- **Page transitions** — smooth Framer Motion animations between routes
- **RTL layout** — native right-to-left Arabic design throughout

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite](https://vite.dev) | Build tool & dev server |
| [Framer Motion](https://www.framer.com/motion/) | Animations & page transitions |
| [React Router v7](https://reactrouter.com) | Client-side routing |
| Google Fonts | Alexandria (sans) + Amiri (serif) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── BeforeAfterSlider.jsx   # Drag-to-compare image slider
│   ├── GlobalNavigation.jsx    # Sidebar + navbar + mobile hamburger
│   └── PageTransition.jsx      # Animated route wrapper
├── data/
│   └── projects.js             # Project data (images, specs, phases)
├── pages/
│   ├── Home.jsx                # Landing page with hero + manifesto
│   ├── Onboarding.jsx          # Splash screen with logo animation
│   ├── PlaceholderPage.jsx     # Coming soon placeholder
│   ├── ProjectDetails.jsx      # Full project case study
│   └── Projects.jsx            # Projects gallery listing
├── App.jsx                     # Route definitions
├── index.css                   # Global design system + responsive
└── main.jsx                    # React entry point
```

## 📱 Responsive Design

The site uses CSS custom properties that automatically adapt across breakpoints:

- **Desktop** (>1024px) — Full sidebar + spacious editorial layout
- **Tablet** (768–1024px) — Compact sidebar, reduced spacing
- **Mobile** (<768px) — Sidebar hidden, hamburger menu, stacked layouts

## 📄 License

MIT
