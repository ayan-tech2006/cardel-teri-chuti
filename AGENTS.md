# CARDEL Web - Agent Guidelines

## Project Overview
Static luxury business card customizer website. No build system, no bundler, no package manager. Pure HTML/CSS/JS served as static files.

## File Structure
```
/
├── index.html          # Main page (hero, card customizer, materials, steps, about, partners)
├── materials.html      # Materials & layout selection page
├── order.html          # Order configuration & checkout page
├── shared.js           # Shared JS: state, canvas rendering, 3D tilt, zoom, materials, order logic
├── style.css           # All styles (~2400 lines)
├── image/              # Assets (images, videos)
└── .github/workflows/  # CI (if any)
```

## Commands
- **No build step** - edit files and open HTML directly in browser
- **No test framework** - manual testing in browser only
- **No linter/formatter** - follow conventions below
- **Local dev**: Open `index.html` in a browser (or use Live Server / `python -m http.server`)
- **No `package.json`** - all dependencies loaded via CDN

## CDN Dependencies
- **GSAP 3.12** + ScrollTrigger - animations
- **Three.js r128** - 3D rendering (minimal usage)
- **Lenis 1.1.14** - smooth scrolling
- **Tailwind CSS (CDN)** - utility classes (used sparingly)
- **Google Fonts** - Playfair Display, Inter, Cormorant Garamond

## Code Style

### JavaScript (`shared.js`)
- **No modules** - all code is global scope, loaded via `<script>` tags
- **No semicolons** in most places, but be consistent with surrounding code
- **Naming**: `camelCase` for functions/variables, `PascalCase` for constructor-like functions
- **State**: Single global `state` object holds all app data (cardData, orderConfig, materials, etc.)
- **DOM access**: Use `document.getElementById()` and `document.querySelector()` directly
- **Event handlers**: Inline `onclick` in HTML + `addEventListener` in JS (mixed patterns exist)
- **Canvas rendering**: HDR-style drawing functions prefixed with `draw` (e.g., `drawCard`, `drawMetalHDR`)
- **GSAP animations**: Use `gsap.to()`, `gsap.fromTo()`, `gsap.killTweensOf()` for animations
- **Debouncing**: Use `clearTimeout`/`setTimeout` pattern for expensive operations (see `syncFromSidebar`)
- **Error handling**: Minimal - rely on null checks (`if (element) ...`) before DOM operations
- **Comments**: Use `// ===== SECTION =====` dividers and `// ──` horizontal rules

### CSS (`style.css`)
- **CSS variables** in `:root` for colors, fonts, easing tokens
- **Naming**: BEM-ish with kebab-case (`.card-container-3d`, `.material-card`, `.checklist-item`)
- **Responsive**: Mobile-first breakpoints at `768px`, `900px`, `968px`, `1100px`, `1200px`, `1400px`
- **Animations**: Use CSS custom properties for easing (`--ease-out-expo`, `--transition-premium`)
- **3D transforms**: `perspective()`, `rotateX/Y`, `scale3d`, `translateZ` for card effects
- **Hardware acceleration**: Use `will-change: transform`, `translateZ(0)`, `translate3d()` for smooth animations
- **Z-index**: Values range from 1 to 10001 - be careful with layering

### HTML
- **DOCTYPE**: `<!DOCTYPE html>` with `lang="en"`
- **Meta tags**: charset UTF-8, viewport for responsive
- **Script loading**: CDN scripts in `<head>`, `shared.js` before `</body>`, page-specific inline scripts after
- **Inline styles**: Heavy use of inline `style=""` attributes (especially in index.html sections) - this is an existing pattern
- **Base target**: `<base target="_blank">` opens all links in new tabs

## Key Patterns

### Global State Management
```js
const state = {
    cardData: { name, title, number, email, material },
    activeHotspot, isZoomed,
    orderConfig: { quantity, basePrice, addons: { nfc, qr, laser } },
    materials: { metal: [], wood: [], carbon: [], limited: [] }
};
```

### Canvas Drawing Pipeline
1. `drawCard(canvasId, side, w, h)` - main entry point
2. `drawHDRBackground()` - material-specific backgrounds
3. `drawHDRFrontSide()` / `drawHDRBackSide()` - content
4. `drawPremiumBorder()` - edge styling

### Page Communication
- `localStorage` via `saveToStorage()` / `loadFromStorage()` for state persistence across pages
- `window.functionName = functionName` to expose functions across script boundaries

## Adding New Features
1. Add HTML to the appropriate page file
2. Add styles to `style.css` (group by section, use comment headers)
3. Add JS to `shared.js` if shared, or inline `<script>` if page-specific
4. Update `state` object if new data is needed
5. Test in Chrome at desktop (1440px) and mobile (375px) breakpoints

## Gotchas
- `drawCard` is defined twice in `shared.js` (line ~663 and ~971) - the second definition overwrites the first
- Many functions assume DOM elements exist - always null-check before accessing
- `state.isZoomed` controls whether card text is rendered - critical flag for zoom state
- Order page intercepts `toggleAddon` from shared.js - be careful modifying that function
- Lenis smooth scroll is initialized per-page - don't duplicate initialization
