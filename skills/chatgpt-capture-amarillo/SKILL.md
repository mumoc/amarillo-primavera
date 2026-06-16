---
name: chatgpt-capture-amarillo
description: |
  Prompt template to extract all amarillo-primavera context from ChatGPT
  conversations into the correct project structure.
---

# ChatGPT Capture — amarillo-primavera

Use this prompt in ChatGPT to extract everything related to the "amarillo-primavera" brand.

---

## Prompt — copy from here

---

I want to extract all context about my "amarillo-primavera" brand from our conversations.

amarillo-primavera is a product brand. The repository structure is:

- `brand/` — core identity (about, voice, colors, logo guidelines)
- `products/<slug>/` — one folder per product containing `description.md` + `images/`
- `content/drafts/` — social media post drafts (Facebook, Instagram, Pinterest)
- `context/` — raw imported material, research, or external sources

Go through our conversations about amarillo-primavera (or any product/brand work that belongs here) and extract everything worth keeping.

For each distinct topic, produce a separate file following the rules below.
Output them one after another, each starting with its `SAVE AS:` line.

---

### File type rules

| What it is                        | Target folder                  | File naming                  |
|-----------------------------------|--------------------------------|------------------------------|
| Brand identity, voice, colors     | `brand/`                       | `about.md`, `voice.md`, etc. |
| Product description + details     | `products/<slug>/`             | `description.md`             |
| Social media post draft           | `content/drafts/`              | `post_title_here.md`         |
| Raw imported context / research   | `context/`                     | `topic-name.md`              |

---

### Frontmatter

Every file must start with YAML frontmatter:

**brand files:**
```yaml
---
type: brand
tags: [identity, voice, colors]
---
```

**product files:**
```yaml
---
type: product
slug: product-slug
tags: [category]
---
```

**content drafts:**
```yaml
---
title: Draft Title
type: post
platform: facebook|instagram|pinterest
status: draft
tags: tag1, tag2
---
```

**context files:**
```yaml
---
type: context
tags: [source, research]
---
```

---

### Output format

For each file, start with:

```
SAVE AS: <folder>/<filename.md>
```

Then the full markdown content starting with `---`.

No explanation. No meta-commentary. Just the files.

---

## How to use

1. Open ChatGPT (new chat or existing amarillo-primavera thread)
2. Paste the entire block above
3. Copy the output
4. Bring it back here — I'll parse the `SAVE AS:` blocks and write the files
5. Commit

Repeat across multiple conversations if needed.
