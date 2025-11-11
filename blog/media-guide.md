---
layout: default
title: Using Images and Videos in Posts
permalink: /blog/media-guide/
---

# Using Images and Videos in Posts

You can now keep reusable media assets directly in the repository. This guide shows how to add them to any Markdown post under `_posts/`.

## 1. Add your files

- **Images**: save PNG, JPG, SVG, or GIF files inside the new `/images/` directory.
- **Videos**: keep large files in `assets/videos/` (create the folder if it does not exist) or host them externally (e.g., YouTube, Vimeo) and embed them.

When you commit a new image or video, use short, descriptive file names without spaces so the URLs remain readable.

## 2. Reference images from Markdown

Use standard Markdown syntax to display an image, pointing to the file with an absolute path from the site root:

```markdown
![Evolution of the model](/images/model-evolution.png)
```

Add optional HTML attributes with Kramdown to control width, add captions, or wrap the image:

```markdown
![Evolution of the model](/images/model-evolution.png){: width="600" }
*Figure 1: Weekly calibration results.*
```

To include images side by side, wrap them in a `<div>`:

```html
<div class="media-grid">
  <img src="/images/scenario-a.png" alt="Scenario A" width="320">
  <img src="/images/scenario-b.png" alt="Scenario B" width="320">
</div>
```

## 3. Embed videos

For videos stored alongside the site, use the HTML `<video>` tag:

```html
<video controls width="720">
  <source src="/assets/videos/simulation.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

For externally hosted videos (e.g., YouTube), embed an iframe. Remember to replace the `VIDEO_ID` placeholder:

```html
<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Demonstration"
    width="720"
    height="405"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

## 4. Keep posts tidy

- Always provide descriptive `alt` text for accessibility and better SEO.
- Compress large images before committing them to the repository.
- Prefer streaming platforms for lengthy videos to keep the site fast.

With these conventions you can drop media into a post, preview locally with `bundle exec jekyll serve`, and publish without additional configuration.
