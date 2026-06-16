# amarillo-primavera

Brand, product catalog, and social media content helper.

## Structure

- `brand/` — Core identity (about, voice, colors, logo, audience, sub-brand tone, photography, hashtags)
- `products/` — Product catalog (one folder per product with images + description)
- `content/` — Social posts
  - `drafts/` — Work in progress
  - `published/` — Final posts organized by platform (facebook, instagram, pinterest)
- `skills/` — Reusable workflows
- `context/` — Imported external context (ChatGPT exports, raw sources)

## Workflow

1. Add product photos + short description in `products/<slug>/`
2. Draft social posts in `content/drafts/`
3. Move finished posts to `content/published/<platform>/`
