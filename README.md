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
