# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). It features a responsive layout powered by CSS Grid and fluid typography, serverless database integration with Neon and Drizzle ORM, and client-side state management using SolidJS with TanStack Query.

## Table of contents

- [Overview](#overview)
  - [Features](#features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### Features

- **Responsive Fluid Layout:** Displays an optimal layout across mobile, tablet, and desktop screens using semantic HTML5, CSS Grid, Flexbox, and fluid typography/spacing scaled with CSS `clamp()`.
- **Accessible Navigation Menu:** Built using the native HTML Popover API, enhanced with accessibility best practices (using JavaScript to trap focus with the inert attribute and dynamically update aria-expanded and aria-label).
- **Serverless Database Integration:** Retrieves statistics dynamically from **Neon** (serverless PostgreSQL database) mapped with **Drizzle ORM**.
- **Efficient Async State Management:** Implements Astro Actions for secure server-side queries and manages client-side data states (loading spinner animation, error handling, and caching) using TanStack Solid Query in SolidJS.
- **Smart Localization Formatting:** Automatically formats large numbers into compact, _reader-friendly_ representations (e.g., 2.4M and 38K) using JavaScript’s `Intl.NumberFormat`.
- **Refined Micro-interactions:** Features custom hover and focus states, including smooth underline transitions and delayed hamburger icon animations.

### Screenshot

<!-- isi screenshot -->

![](./screenshot.jpg)

### Links

- Solution URL: [solution URL](https://your-solution-url.com) <!-- ganti link -->
- Live Site URL: [live site URL](https://your-live-site-url.com) <!-- ganti link -->

## My process

### Built with

- [Astro v7](https://astro.build) - Fullstack Framework
- [TypeScript](https://www.typescriptlang.org) - Javascript superset with static typing (built-in from astro)
- [Solidjs v1.9](https://react.dev/) - Frontend framework
- [Tailwind v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Neon](https://neon.com/) - Serverless Postgres database
- [TanStack Query](https://tanstack.com/query/latest) - Data fetching library
- [Drizzle ORM v1.0.0-rc](https://orm.drizzle.team/) - Database ORM
- [Lucide](https://lucide.dev/) - Icon library

### What I learned

During this project, I learned how to build a robust server-client bridge for data fetching using Astro Actions, Drizzle ORM, and TanStack Solid Query:

- **Server-Side Database Querying with Drizzle ORM**: I learned how to fetch data securely from Neon database using Drizzle ORM on the server, wrapping it inside an Astro Action to prevent exposing sensitive credentials to the client.

```typescript
// src/actions/index.ts
export const server = {
  getStats: defineAction({
    handler: async () => {
      try {
        const statsData = await db.select().from(stats);
        return statsData;
      } catch (error) {
        console.error(`Failed to retrieve data from database: ${error}`);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve stats data",
        });
      }
    },
  }),
};
```

- **Client-Side Data Fetching & State Management**: I learned how to use TanStack Query in SolidJS to fetch data asynchronously from the server action. This simplified state management by automatically providing loading (`isPending`), error (`isError`), and cached success states.

```typescript
// src/components/stats/Stats.tsx (simplified)
const query = useQuery(() => ({
  queryKey: ["stats"],
  queryFn: async () => {
    const { data, error } = await actions.getStats();
    if (error) throw error;
    return data;
  },
}));
```

### Continued development

For the next stages of this project, I plan to focus on improving the user experience, adding interactive database mutations, and polishing UI animations:

- **Skeleton Loaders**: Replace the current basic loading spinner with dynamic skeleton loader cards to improve the perceived loading speed and UI smoothness.
- **GSAP Animations**: Incorporate the GreenSock Animation Platform (GSAP) to create high-performance entrance animations and micro-interactions for the dashboard components.
- **Database Mutations**: Add an interface/form to input new statistics, using Astro Actions alongside TanStack Query's mutations to dynamically write data back to the Neon PostgreSQL database.
- **Real-Time Data Polling**: Configure TanStack Query to automatically refetch data at set intervals to simulate live, real-time metrics.

### Useful resources

- [TinyPNG](https://tinypng.com/) - Helped me compress and optimize the images in the project without losing quality, making the page load faster.
- [Cloudinary](https://cloudinary.com/) - Used to host the Open Graph and Twitter card images for social media sharing.
- [Perfect Pixel](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjlophiddqccjgplachon0304v) - Chrome extension that allowed me to overlay the design mockup directly on my live page for pixel-perfect accuracy.
- [Fontsource](https://fontsource.org/) - This made self-hosting fonts incredibly easy. I simply installed the font package via npm and imported it directly into my JS file, eliminating the hassle of managing font files manually or relying on external CDNs.
- [Fluid Typography Calculator](https://royalfig.github.io/fluid-typography-calculator/) - A helpful tool for calculating responsive font sizes using CSS clamp(), which makes it easy to generate fluid text sizing that adapts smoothly between screen widths.

### AI Collaboration

This project was developed with the assistance of an AI coding partner (Antigravity by Google DeepMind) to streamline feature development, discuss code structure, and solve technical challenges.

**How I used it:**

- **Database Seeding (`src/db/seed.ts`)**: The AI helped write the database seed script using Drizzle ORM to efficiently insert the initial statistical dashboard data (such as student, school, and teacher statistics) into the Neon PostgreSQL database.
- **`classList` Utility (`src/utils/class-list.ts`)**: The AI assisted in designing a lightweight custom `classList` helper function to handle conditional and dynamic class names cleanly, without relying on external libraries like `clsx`.

This collaboration made it easier to manage utility functions and set up backend data, allowing more focus on the layout and frontend logic.

## Author

- GitHub - [Force Close](https://github.com/forceclosee)
- Frontend Mentor - [@forceclosee](https://www.frontendmentor.io/profile/forceclosee)
- X - [@forceclosee](https://x.com/forceclosee)
