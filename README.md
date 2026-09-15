# GREENSPANZ Portfolio

Architecture portfolio site for Althaf Ahmed / GREENSPANZ.

## Project structure

```
greenspanz-site/
├── index.html        # Page markup + the 4 views (home/about/work/contact)
├── css/
│   └── style.css      # All styling
├── js/
│   └── script.js       # Carousel + menu/view-switching logic
├── assets/
│   ├── logo.png
│   ├── project1.jpg    # Modern Villa in Kerala
│   ├── project2.jpg    # Urban Apartment Design
│   ├── project3.jpg    # Minimalist Interior Concept
│   └── facade-study.jpg
└── README.md
```

No build step, no dependencies — plain HTML/CSS/JS. Open `index.html` directly in a browser to preview locally.

## Publish to GitHub

```bash
cd greenspanz-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(Create the empty repo on GitHub first at github.com/new, then run the commands above from inside this folder.)

## Deploy to Vercel

**Option A — Vercel dashboard (easiest)**
1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import the repo you just pushed.
3. Framework preset: choose **Other** (it's a static site, no build command needed).
4. Leave build/output settings blank and click **Deploy**.

**Option B — Vercel CLI**
```bash
npm install -g vercel
cd greenspanz-site
vercel
```
Follow the prompts (link to your Vercel account, confirm the project name). Running `vercel --prod` afterwards pushes it live.

Either way, Vercel will serve `index.html` from the project root automatically — the included `vercel.json` just makes that explicit.

## Notes

- The 4th project image (`facade-study.jpg`) is a placeholder — swap in a real project photo when you have one.
- Colors, logo, and copy are pulled from the original GREENSPANZ files; fonts are Space Grotesk + IBM Plex Sans.

## SEO

What's already in place:
- Unique `<title>` and meta description, Open Graph + Twitter card tags (for link previews on WhatsApp/social), and a canonical URL.
- `ProfessionalService` structured data (JSON-LD) in `index.html` — helps Google understand this is a local architecture business and can surface richer results.
- `robots.txt` and `sitemap.xml` listing all four pages.
- Real, bookmarkable URLs — `/`, `/about`, `/work`, `/contact` — instead of everything living under one URL, so each page can be linked and indexed on its own.

**Once you have your final domain**, replace every occurrence of `https://greenspanzindia.vercel.app` in `index.html`, `robots.txt`, and `sitemap.xml` with your real domain — search engines and social previews use the exact URL you publish there.

**Honest limitation:** this is a single-page app — the four "pages" are really one `index.html` with JavaScript showing/hiding sections. Modern Google crawling handles this fine, but other tools (link-preview bots, some SEO crawlers) may only ever see the homepage content. If organic search ever becomes a serious growth channel, converting `about.html` / `work.html` / `contact.html` into real separate pages with their own content is the more bulletproof long-term move — ask me if you want that later.

Beyond the code, the highest-leverage SEO step for a local studio like this is usually a free **Google Business Profile** (business.google.com) — it's what actually shows up for "architect Kochi" type searches, more than on-page tags do.

## The project request form

The "Send a project request" section on the Contact page works with **zero backend and zero signup**: it builds a pre-filled email and hands it to the visitor's own email app via a `mailto:` link addressed to `althafahmed071@gmail.com`.

Trade-off: it requires the visitor to have an email app configured (most desktops do; some phones/browsers don't). If you want submissions to land in your inbox without depending on that:
1. Sign up free at [formspree.io](https://formspree.io) and create a form — you'll get an endpoint like `https://formspree.io/f/xxxxxxxx`.
2. In `js/script.js`, replace the `mailto:` submit logic with a `fetch()` POST to that endpoint (Formspree's docs show the exact snippet).
3. Keep the existing honeypot field (`companySite`) — it also works with Formspree and filters out most spam bots for free.

## Security

Applied already:
- `vercel.json` sets security headers on every response: `Content-Security-Policy`, `X-Frame-Options` (blocks the site being embedded in someone else's iframe — a common phishing trick), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and HSTS (forces HTTPS).
- All external links (Instagram) use `rel="noopener noreferrer"`, which stops the linked page from getting a handle on `window.opener` — a known tab-hijacking vector.
- The request form has a honeypot field and basic client-side validation to cut down spam.
- Vercel itself gives you free automatic HTTPS and basic DDoS protection on every deploy — no setup needed.

Worth knowing:
- Client-side validation (in the form) is a UX nicety, not a security boundary — since there's no backend here, there's nothing server-side to attack yet. If you add Formspree or any real backend later, re-validate everything there too; never trust input that only passed a JavaScript check.
- If you ever add a contact database, admin login, or payment flow, that's a different risk category entirely (auth, secrets, injection) and worth a dedicated review at that point — this static-site hardening doesn't cover it.

