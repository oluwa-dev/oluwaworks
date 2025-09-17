# BuilwithAyo

- BuilwithAyo is my full-stack portfolio website: a clean, fast showcase of work (no-code → low-code → custom dev), with a private admin to manage projects and submissions.


# Features

### Hero Section
- **Blueprint-style glow** with magnetic CTA button
- **ShowcasePanel** component that toggles between *No-code / Low-code / Custom dev* options
- Eye-catching visual design to immediately capture visitor attention

### Featured Work
- Displays 2–3 highlighted projects prominently on homepage
- "View all work" link directs to full projects page
- **Client-side fetch** from `/api/projects?featured=true&limit=2|3`
- **Skeleton loader** implementation to prevent layout shift during loading

### Projects (Work) Page
- Complete project portfolio with alternating row layout
- **Tag filtering** system for easy project categorization
- **API-driven pagination** using `limit` and `cursor` parameters
- Smooth browsing experience with optimized loading

### Contact Form
- Simple, clean contact form with essential fields:
  - Name, email, company, message
  - **Honeypot field** (`website`) for spam protection
- Form submissions routed to admin dashboard for management

### About Page
- Comprehensive personal story structured as:
  - Introduction
  - Experience timeline
  - What I do (services/skills)
  - How I work (process/approach)
  - Outside of work (personal touch)
- Homepage includes **About teaser** section linking to full `/about` page


---

## Admin Dashboard (Protected)

### Authentication System
- **NextAuth** implementation with Credentials provider
- **Prisma** user model integration
- **bcrypt** password hashing for security
- Secure session management


### Projects Management
- **Complete CRUD operations** for project portfolio:
  - List all projects with filtering options
  - Filter by `featured` status, `tags`, and `search` terms
  - **Soft optimistic updates** for feature/unfeature actions
  - Edit and delete functionality via REST endpoints
- **Image upload integration** with **Cloudinary**
- Real-time updates without page refresh

### Submissions Management
- **Admin list page** for contact form submissions
- **Advanced filtering** with search and status options
- **Cursor-based pagination** for fast "load more" functionality
- Efficient handling of large submission volumes

### Feedback/Testimonials System
- **API endpoint** accepts validated feedback using **Zod** schema
- **Optional avatar image upload** pattern:
  - Multipart form handling
  - **Cloudinary** integration for image storage
- Testimonial management and display system

