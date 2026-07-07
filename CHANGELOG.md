# Changelog

Format: [vx.y.z] - `YYYY-MM-DD`
Dates follow ISO 8601 standard.

## [latest] - `yet-to-release`

### Documentation

- Add license information and contribution guidelines in README.md file, also update tech stack and features section
- Add CONTRIBUTING.md file to provide guidelines for contributing to the project

### UX Enhancements

- Add a "Forgot Password" link in the sign-in page to allow users to reset their password (although feature existed, there was no link)

### Refactored

- Move sample memories constant from Landing page to constants/index.js file
- Update pages and app coding styles to match the standards defined in the eslint configuration file
- Remove unnecessary escape characters in regex patterns in password validation component
- Remove unused import in Hero component
- Render `Context` as context provider instead of `Context.Provider` in AuthContext component (only possible in React 19)
- Move constants from about page to contants/index.js file
- Move `RenderMarkdown` component from `MemoryCard` component to a separate file
- Add `id` to each memory object in sample memories constant to avoid using index as key in memory cards

### Chores

- Add dev dependencies for eslint, listed below:
    - `@eslint-react/eslint-plugin`
    - `@eslint/js`
    - `eslint`
    - `globals`
- Add eslint configuration file `eslint.config.js` and npm scripts for linting to enforce coding standards and best practices.
- Add `.editorconfig` file to provide consistent coding styles across different editors and platforms.
- Add `.gitattributes` file to ensure consistent handling of line endings and text files across different operating systems.
- Add issue templates for bug reports and feature requests to streamline issue reporting and tracking.
- Bump `@tailwindcss/vite` from 4.3.1 to 4.3.2 [#9]
- Bump `react-router` from 8.0.1 to 8.1.0 [#10]
- Bump `tailwindcss` from 4.3.1 to 4.3.2 [#11]
- Bump `@supabase/supabase-js` from 2.108.2 to 2.110.0 [#12]
- Bump `vite` from 8.1.0 to 8.1.3 [#13]
- Bump `@eslint-react/eslint-plugin` from 5.10.3 to 5.11.2 [#14]
- Bump `supabase` from 2.108.0 to 2.109.0 [#15]
- Update dependencies using `npm update` to ensure the project uses the latest compatible versions of its dependencies.

## [v0.3.0] - `2026-07-04`

### Features

- Added toast notifications using sonner package for errors and successes in auth and dashboard pages
- Added glasmorphism for image in memory details page
- Added loading screens in the following pages/layouts: (all of them aren't 100% same)
    - new password page
    - public only route
    - protected route
    - edit memory page
    - dashboard home page
    - memory details page
- Add `generate-memory-insights` as a supabase edge function to generate insights using AI (here we use Gemini)
    - AI returns a JSON containing these: mood, moodEmoji and tags
    - Request a call to this function in upload memory page, once the user uploads the memory, we offer them to generate ai insights through an action button in the toast notification shown up
    - Display mood with emoji in dashboard home and memory details page as a badge (shaped as a pill)- Display tags in memory details page
    - User can also generate insights in memory details page
- Add markdown support for memory descriptions
    - Allows secure external links
    - Add github flavoured markdown
    - Sanitize before HTML is rendered
    
### UX Enhancements

- Improve edit button in edit memory page
    - set full width for edit button
    - reduce border radius from full to lg
    - change text from "Save Changes" &rarr; "Update Memory"
    - change bg color to cyan for disabled buttons also
    - Replaced "No Changes to Save" with a tooltip
- Improve accessibility by adding `role` attribute for password validation component
- If the memory which the user is looking for doesn't exist, tell them it doesn't exist instead of telling that an unexpected error occurred.
- Add deterministic color to mood badge based on mood value
- replace the url in browser history while navigating since the memory no longer exists after deletion of memory in memory details page

### Bug Fixes

- Added try catch block in new password page for session check
- comparison logic of titles written by me has flaws, instead use built-in method `localeCompare`
    - the method I used sorts uppercase before lowercase like "Zebra" before "apple" in ascending
    - localeCompare handles accents, diacritics and symbols naturally.
- set loading state to false on early returns in upload memory page
- remove status number shown in toast notification (of an error) while signing in or signing up
- removed feature that allows user to click anywhere on the memory and redirect to memory details of that specific memory (because description is markdown supported and may contain links)

### Refactorings

- Remove redundancy of code in memory details page and avoid mutation of a fetched object
- Do not mutate on the fetched memories object in dashboard home
- Use canonical class names fro tailwind styles (as suggested by tailwind intellisense)
- Add constants/index.js to store constants such as:
    - Version of the web app
    - Mood badge colors
    - Timeline marker colors
    - Max image size that can be uploaded

### Chores

- Added `sonner` package to dependencies to add toast notifications
- bump `react-router` from 7.18.0 to 8.0.1 [#8]
- add `supabase` cli to dev dependencies for supabase edge functions
- Remove unnecessary navbar import in 404 page
- bump `supabase` from 2.107.0 to 2.108.0
- add `rehype-sanitize`, `react-markdown`, `remark-gfm` and `@tailwind/typography` for rendering markdown provided by user in memory description

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

[#15]: https://github.com/PuneetGopinath/memory-garden/pull/15
[#14]: https://github.com/PuneetGopinath/memory-garden/pull/14
[#13]: https://github.com/PuneetGopinath/memory-garden/pull/13
[#12]: https://github.com/PuneetGopinath/memory-garden/pull/12
[#11]: https://github.com/PuneetGopinath/memory-garden/pull/11
[#10]: https://github.com/PuneetGopinath/memory-garden/pull/10
[#9]: https://github.com/PuneetGopinath/memory-garden/pull/9
[#8]: https://github.com/PuneetGopinath/memory-garden/pull/8
[#7]: https://github.com/PuneetGopinath/memory-garden/pull/7
[#6]: https://github.com/PuneetGopinath/memory-garden/pull/6
[#5]: https://github.com/PuneetGopinath/memory-garden/pull/5

[latest]: https://github.com/PuneetGopinath/memory-garden/compare/v0.3.0...HEAD
[v0.3.0]: https://github.com/PuneetGopinath/memory-garden/releases/tag/v0.3.0
[v0.2.0]: https://github.com/PuneetGopinath/memory-garden/releases/tag/v0.2.0
[v0.1.0]: https://github.com/PuneetGopinath/memory-garden/releases/tag/v0.1.0

[b01d643]: https://github.com/PuneetGopinath/memory-garden/commit/b01d6430627d27bb62d43a428a4641247345b1fb