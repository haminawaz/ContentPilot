# ContentPilot Frontend

## What This Product Is

ContentPilot is an AI-assisted SEO content platform. Its job is not just to write articles, but to help a user move from a topic idea to a more complete content package that includes:

- a long-form article in Markdown
- an SEO title and meta description
- target keyword suggestions
- internal and external linking ideas
- a FAQ section based on search intent

The product positioning throughout the app is built around "structural SEO". In simple terms, the experience is trying to feel more strategic than a normal AI writer. Instead of only generating text, the system is meant to analyze search results first, then produce content shaped by SERP signals and SEO structure.

## What The Frontend Is Doing

The `frontend-next` app is the public website and product UI built in Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

It currently has 2 main responsibilities:

1. Present the ContentPilot brand and value proposition on the marketing site.
2. Provide the product interface for signing up, signing in, viewing the dashboard, and generating an article.

### Main user journey

The current user flow is:

1. Land on the homepage and understand the product promise.
2. Go to signup or login.
3. Enter the dashboard.
4. Start article generation from the dashboard.
5. Submit a topic, language, and target length.
6. Review the generated article, SEO data, links, and FAQ output.

## Frontend Pages And Purpose

### Auth experience

The frontend includes pages for:

- signup
- login
- forgot password
- reset password

Right now these pages are mostly UI and form-validation work. They are styled and structured well, but they are not fully connected to the backend auth endpoints yet. In their current state they behave more like product-ready screens than fully integrated authentication flows.

### Dashboard experience

The dashboard gives the user a command-center style layout with:

- sidebar navigation
- top navigation
- dashboard summary cards
- recent article list
- profile screen
- article generation screen

The dashboard currently communicates the product vision clearly, but some dashboard data is still static/demo data rather than live backend-driven analytics.

### Article generation experience

This is the most important implemented workflow in the frontend.

The user can:

- enter a topic or keyword
- choose a language
- choose a target word count
- send the request to the backend

After generation, the frontend renders the result in 4 tabs:

- `Article`: Markdown article preview
- `SEO data`: title, meta description, target keywords
- `Links`: internal and external link suggestions
- `FAQ`: question and answer set

This makes the output feel like a full SEO content package instead of a plain text block.
