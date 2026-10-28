# Ömer Selim Durman — Portfolio

Personal portfolio site: about me, skills, experience, education, projects and a contact form.

Built with [Next.js 16](https://nextjs.org) (App Router) and TypeScript. Styling is plain CSS in [`app/globals.css`](app/globals.css), carried over from the original HTML/CSS version of the site. The page is prerendered as static HTML; the contact form runs as a server action that sends email over SMTP.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3100. To use a different port, change `-p 3100` in the `dev` and `start` scripts in `package.json`.

To make the contact form send email, copy `.env.example` to `.env.local` and fill in the SMTP values. Without them the site still works, and the form tells visitors to email directly.

## Edit the content

All text, skills, experience, education and projects live in [`content/site.ts`](content/site.ts). Components only handle layout, so most updates are a change to that one file.

- **Add a project:** add an entry to `projects`. Leave out `github` for projects whose code isn't public.
- **Change the images:** replace `public/images/avatar.png` (hero) or `public/images/background.png` (hero, projects and footer background).

## Project structure

```
app/             Routes, root layout, global CSS, server action, metadata (OG image, sitemap, robots, icon)
components/      Page sections: navbar, hero, about (with the card slider), projects, contact, footer
content/site.ts  Everything the site says
assets/fonts/    Font files used to render the Open Graph image
```

The previous static HTML/CSS/JS version of the site is in the git history (commit `46b603b`).

## Scripts

| Command             | What it does                             |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the dev server                     |
| `npm run build`     | Build for production                     |
| `npm start`         | Serve the production build               |
| `npm run lint`      | Run ESLint                               |
| `npm run typecheck` | Check types with the TypeScript compiler |

## Deploy

The easiest host is [Vercel](https://vercel.com): import the GitHub repository, add the variables from `.env.example` under **Settings → Environment Variables**, and deploy. Every push to `main` redeploys.

Any host that runs Node.js works too: `npm run build && npm start`.
