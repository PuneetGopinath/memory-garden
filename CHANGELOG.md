# Changelog

## [v0.2.0] - `yet-to-be-released`

### Features

- Implemented editing of image in a memory
- Designed a "HTTP 404 Page Not Found" page for 404 errors
- Add more meta tags for improved SEO, open graph previews and X previews
- Add robots.txt for web crawlers

### Bug Fixes

- Add refs to clear input file state in the browser UI
- Correct destination of navbar links
- wrap timeline event in a Link component only if the link prop is received

### Chores

- Added images for 3 other memory cards in landing page
- (Refactor) Rename TimelineEvent to Event and export it to be used in Hero section of the Landing page to avoid redundancy
- (Refactor) Create common home layout for all home pages
- bump @tailwindcss/vite from 4.3.0 to 4.3.1 [#5]
- bump tailwindcss from 4.3.0 to 4.3.1 [#6]
- bump @supabase/supabase-js from 2.108.0 to 2.108.2 [#7]

## [v0.1.0] - `06-12-2026`

### Features

- User Accounts using Supabase Auth
- Protected Dashboard
    - Memory creation with images
    - Memory updation, deletion
    - Timeline view for memories
    - View memory individually
- Secure and private image storage using private buckets from Supabase Storage
- Responsive UI built with React and TailwindCSS

### Known Limitations

- Image replacement during editing not supported
- AI not used yet to generate summaries and mood

[$#7]: https://github.com/PuneetGopinath/memory-garden/pull/7
[#6]: https://github.com/PuneetGopinath/memory-garden/pull/6
[#5]:https://github.com/PuneetGopinath/memory-garden/pull/5

[v0.1.0]: https://github.com/PuneetGopinath/memory-garden/releases/tag/v0.1.0