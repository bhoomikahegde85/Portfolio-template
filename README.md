# Bhoomika Hegde — Personal CV Website (v2)

A baby-pink-to-butter-cream personal portfolio with tasteful interactivity: scroll reveals, a custom cursor, project filtering, and an embedded LinkedIn post. Zero frameworks, zero build tools — pure HTML5, CSS3, and vanilla JavaScript.

---

## What's new in this version

- **New palette** — baby pink (`#FFC4D6`) to butter cream yellow (`#FFE9A8`), with a warm plum-brown ink color instead of pure black.
- **New typography** — Fraunces (a warm, characterful serif) for display text, Inter for body, JetBrains Mono for labels/eyebrows.
- **Custom cursor** — a small dot + trailing ring that grows over clickable elements (desktop only; automatically disabled on touch devices).
- **Scroll-reveal animations** — sections fade and lift into view as you scroll.
- **Gradient hero blobs** — soft, slowly drifting color blobs behind the hero photo.
- **Filterable project grid** — click "Systems," "ML / Research," or "Backend" to filter projects by category.
- **Whole-card project links** — each project card is a single clickable link straight to its GitHub repo.
- **Embedded LinkedIn post** — a "From LinkedIn" section showing a live post via LinkedIn's official embed.
- **Reduced-motion support** — all animations respect `prefers-reduced-motion`.

---

## Project structure

```
/
├── index.html        ← All content (well-commented, edit here)
├── styles.css         ← All styles — token system at the top of the file
├── script.js          ← Cursor, scroll-reveal, filters, mobile nav
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── vercel.json
├── .gitignore
├── README.md
└── assets/
    ├── profile.jpg    ← Replace with your own photo
    └── resume.pdf     ← Optional
```

---

## Running locally

```bash
cd cv-site-v2
python3 -m http.server 3000
# open http://localhost:3000
```

Fonts won't load correctly if you just double-click `index.html` (browser security blocks the Google Fonts request over `file://`) — always use a local server.

---

## Editing content

Every section in `index.html` has a comment marker like:

```html
<!-- ✏️ Edit or duplicate .timeline-item blocks below -->
```

Find the marker, edit the text inside, save, refresh.

### Adding your photo
Drop a square photo (400×400px or larger) at `assets/profile.jpg`. If you use a different format, update the `src` attribute on the `<img>` tag in the hero section.

### Adding/removing projects
Each project is an `<li data-category="...">` containing one `<a class="card">`. The `data-category` attribute controls which filter chips show it — use space-separated values (e.g. `data-category="ml systems"`) if a project fits more than one category. To add a new filter chip, add a `<button class="filter-chip" data-filter="yourtag">` in the `.filter-row` and use `yourtag` in the matching project's `data-category`.

### Changing the LinkedIn post
1. Go to the post on LinkedIn.
2. Click the **⋯** menu on the post → **Embed this post**.
3. Copy the `src` URL from the iframe code LinkedIn gives you.
4. In `index.html`, find the `#feed` section and replace the `src` value on the `<iframe>`.

Only **public** LinkedIn posts can be embedded this way.

### Changing colors
All colors are CSS custom properties at the top of `styles.css`:

```css
:root {
  --pink: #FFC4D6;
  --butter: #FFE9A8;
  --pink-deep: #F2799E;
  --butter-d: #E8B84B;
  /* ... */
}
```

Change these and the whole site updates — gradients, accents, hover states all reference these variables.

---

## Your 3 scaffolded project repos

Alongside this site, starter code was generated for the three GitHub repos linked from the Projects section:

1. **dog-activity-recognition-system** — event-driven platform with Kafka, FastAPI, and a CLIP-based inference stub.
2. **academic-management-system** — three independently deployable microservices (scheduling, feedback, users) with Docker Compose.
3. **vit-pq-image-representation** — PyTorch implementation of the ViT + Product Quantisation architecture (encoder, differentiable PQ codebook, decoder, training/eval scripts).

Each has its own README with setup instructions. To publish them:

```bash
cd dog-activity-recognition-system   # (or the other two)
git init
git add .
git commit -m "Initial scaffold"
git remote add origin https://github.com/bhoomikahegde85/dog-activity-recognition-system.git
git branch -M main
git push -u origin main
```

Repeat for the other two repos, matching the URLs already linked in `index.html`'s project cards. The placeholder/stub logic (marked with `TODO` comments, e.g. the CLIP model loading) is left for you to fill in with your actual implementation — the architecture, contracts, and tests around it are complete and runnable as-is.

---

## Deploying to Vercel

### 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cv-site.git
git branch -M main
git push -u origin main
```

### 2 — Import into Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New → Project**.
2. Select your repo → **Import**.

### 3 — Configure (no build needed)

| Setting | Value |
|---|---|
| Framework Preset | **Other** |
| Build Command | *(leave empty)* |
| Output Directory | `.` |
| Environment Variables | *(none)* |

Click **Deploy**.

### 4 — Add your custom domain

In Vercel: **Settings → Domains** → add `bhoomikahegde.com` and `www.bhoomikahegde.com`. Vercel will show DNS records to add in GoDaddy (**My Products → DNS**). Typical values:

| Type | Name | Value |
|---|---|---|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

SSL is provisioned automatically once DNS propagates (usually 10–30 minutes).

---

## Accessibility & performance

- Semantic HTML5 landmarks throughout.
- Skip-to-content link, visible focus states, ARIA labels on icon-only controls.
- All animations respect `prefers-reduced-motion: reduce`.
- Custom cursor is automatically disabled on touch devices (`hover: hover` media query).
- No layout-shifting webfonts — `display=swap` on Google Fonts.
- No JS framework — `script.js` is under 3KB.
