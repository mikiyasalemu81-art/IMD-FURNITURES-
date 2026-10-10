# IMD Furniture & Design — Agency-Grade Luxury Website

> **Century Mall, Addis Ababa, Ethiopia**  
> Bespoke furniture manufacturing & architectural joinery.

---

## 🛠️ How to Update the Site

All content is statically managed in a single, clean TypeScript file — **`content/site.ts`**:

1. **Add your real photos**:
   - Place your real furniture photos into `/public/gallery/` (e.g. `/public/gallery/my-dining-table.jpg`).
   - Place hero banner photos into `/public/hero/` (e.g. `hero-1.jpg` to `hero-5.jpg`).
    - Place your workshop/showroom story photo in `/public/story/story-showroom.jpg`.
2. **Add or edit items in `content/site.ts`**:
   - Open [`content/site.ts`](file:///c:/Users/ps/Desktop/IMB-Furniture/content/site.ts).
   - Add a new furniture item to the `furnitureItems` array with its title, description (in English, Amharic, and Afan Oromo), category, and image path.
   - Edit phone/WhatsApp numbers, operating hours, addresses, Google Maps locations, or craft process text anytime.
3. **Deploy**:
   - Commit and push your changes to GitHub:
     ```bash
     git add .
     git commit -m "Add new bespoke dining table to gallery"
     git push
     ```
   - Vercel automatically builds and redeploys the site in seconds.

---

## 🌟 Architecture & Features

- **Standard One-Page Structure**:
  - Sticky blurred navbar with smooth anchor links: **Home** (`#home`), **Story** (`#story`), **Gallery** (`#gallery`), **Craft Process** (`#process`), and **Contact** (`#contact`).
  - Active section highlighter with `IntersectionObserver`.
  - Gold **"Call Now"** button (`tel:`) and live Addis Ababa **Open / Closed badge**.
  - Mobile hamburger drawer with slide-in animation.
- **Ultra Smooth Motion & Performance**:
  - **Lenis Inertia Scroll**: Butter-smooth momentum scrolling integrated with anchor links (80px navbar offset). Automatically disabled on touch devices and for users who prefer reduced motion.
  - **Framer Motion Crossfade & Slow Zoom**: 5-slide hero background crossfades every 3 seconds with a slow 6-second cinematic zoom (`scale: 1` to `1.06`) and scroll parallax.
  - **Scroll Reveal**: Sections reveal cleanly with GPU-accelerated opacity and 24px translateY animations (`viewport: { once: true }`).
  - **Story Photo Parallax**: Gentle multi-layered parallax on the workshop photo using `useScroll` and `useTransform`.
  - **GPU-Friendly Only**: Animates exclusively `transform` and `opacity` for 60fps mobile performance.
- **Gallery Showcase & Deep Links**:
  - Category filter pills (All, Sofas, Living Sets, Bed Sets, Dining).
  - Masonry grid with staggered card reveals.
  - Heart icon to save pieces to favorites (`localStorage`).
  - Fullscreen lightbox with touch swipe, keyboard arrows, WhatsApp order prefill, and native sharing.
  - **Deep Links**: Visiting `/?item=slug` automatically opens that item's lightbox directly from anywhere on the web. Old `/gallery` and `/gallery/[slug]` routes automatically redirect to the home page sections.
- **Preloader**:
  - Fullscreen luxury loading screen (`#0B0B0B`) with central IMD logo, dual counter-rotating gold arcs, and active language tagline. Displays on the first visit of each session.
- **Chatbot Widget**:
  - Gold button pinned top-left below the navbar (`top: 88px, left: 16px`).
  - Connects to your Render backend via `NEXT_PUBLIC_CHAT_API_URL` with a 70-second fetch timeout and waking-up state notification.
- **Trilingual Support**:
  - English (`en`), Amharic (`am`), and Afan Oromo (`om`).
  - Choice remembered in `localStorage`.

---

## 🚀 Local Development & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure `NEXT_PUBLIC_CHAT_API_URL` with your Render backend URL (e.g. `https://your-service.onrender.com/chat`).

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Build for Production
```bash
npm run build
npm run start
```
