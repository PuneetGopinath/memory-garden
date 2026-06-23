# Changelog

Format: [vx.y.z] - `YYYY-MM-DD`
Dates follow ISO 8601 standard.

## [v0.2.0] - `2026-06-23`

### Features

- Implemented editing of image in a memory
- Designed a "HTTP 404 Page Not Found" page for 404 errors
- Add more meta tags for improved SEO, open graph previews and X previews
- Add robots.txt for web crawlers
- Reset passwords if forgotten
- Designed a profile page for showing account details and memory garden stats
- Sort memories in the timeline based on user preferences and by default sorted on date descending order
- Added a about page with 3 sections: About Us, About The Author and Open Source
- Added placeholders for legal pages like privacy policy and terms of service
- Add a feature to search through the memories' title and description

### UX Enhancements

- Use dark theme for Loading view in protected and public only route layouts for consistent theme
- Add links to go back accordingly in edit memory, view memory and upload memory pages
- Reduce height of image in view memory to 50% of view port height
- Remove margin top for description and reduce vertical padding for buttons in the memory view page
- The button in edit memory that shows "No changes to save" with a rose background looks weird, so make the background same as the background of container and use zinc for font color
- Improve accessibility for screen readers, if we wrap anchor tag all over the memory card, then whenever screen readers navigate through links only, they have to listen to the whole content
but this method makes sure the screen reader reads only the title
    - Removed the image out of the span coverage as it blocked the hover effect on image, and generally users won't click the image
    - Remove hover effect of mood in memory card as it can not be hovered due to the span
- Add link to view memory in each memory card displayed in the dashboard home so that users can understand that clicking it goes somewhere else
- Show a preview of image selected in upload page and edit page
- Clicking on Logo in the navbar should direct the user to landing page ("/")

### Bug Fixes

- Add refs to clear input file state in the browser UI
- Correct destination of navbar links
- wrap timeline event in a Link component only if the link prop is received
- Fix link to profile in the navbar of dashboard to correct route

### Chores

- Added images for 3 other memory cards in landing page
- (Refactor) Rename TimelineEvent to Event and export it to be used in Hero section of the Landing page to avoid redundancy
- (Refactor) Create common home layout for all home pages
- bump @tailwindcss/vite from 4.3.0 to 4.3.1 [#5]
- bump tailwindcss from 4.3.0 to 4.3.1 [#6]
- bump @supabase/supabase-js from 2.108.0 to 2.108.2 [#7]
- (Refactor) move react app from declarative mode to data router mode
- Added a pull request template with basic checks
- Update deps using npm update

## [v0.1.0] - `2026-06-12`

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

[#7]: https://github.com/PuneetGopinath/memory-garden/pull/7
[#6]: https://github.com/PuneetGopinath/memory-garden/pull/6
[#5]:https://github.com/PuneetGopinath/memory-garden/pull/5

[v0.2.0]: https://github.com/PuneetGopinath/memory-garden/releases/tag/v0.2.0
[v0.1.0]: https://github.com/PuneetGopinath/memory-garden/releases/tag/v0.1.0

[b01d643]: https://github.com/PuneetGopinath/memory-garden/commit/b01d6430627d27bb62d43a428a4641247345b1fb