# Testimonia

Testimonia is an open-source platform to collect, manage, and showcase testimonials from your users — all in one place.

Create branded testimonial pages, collect feedback through a shareable link, moderate responses, and embed testimonials anywhere on your website using clean, script-free widgets.

## ✨ Features
## 🧩 Spaces

· Create multiple spaces for different products or projects

· Custom branding (logo, theme, accent colors)

· Enable or disable spaces instantly

 ## 📝 Testimonial Collection

· Share a public link to collect testimonials

· Ask up to 5 custom questions

· Optional fields:

   · Name

   · Email

   · Title / company

   · Social link

   · Address

   · Star rating

   · Image upload support

 ## ✅ Moderation

· Approve or reject testimonials

· Like testimonials to feature them publicly

· Disable testimonials without deleting them

 ## 💌 Email Requests

· Send testimonial requests via email

· Track sent emails

· Built-in password reset & email verification emails

## 🧱 Embed Widgets

· Wall of Love

· Single Testimonial

· Social Proof Avatar Strip

· Fully iframe-based (no scripts required)

· Custom width & height

· Safe to embed anywhere

## 🔐 Authentication

· Email + password authentication (BetterAuth)

· Password reset & email verification

· Secure session handling

## ⚡ Modern Stack

· Next.js App Router

· TanStack Query

· Drizzle ORM + Neon

· Tailwind CSS + shadcn/ui

· Resend (emails)

· Cloudinary (image uploads)

## 🖼️ Widgets Preview
## 🟦 Wall of Love

Display multiple testimonials in a beautiful scrolling or grid layout.

## ⭐ Single Testimonial

Embed a single testimonial anywhere on your site.

## 👥 Social Proof Avatars

Show trusted user faces with a short message like:

“Trusted by 1,000+ users worldwide”

### 🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/SyedJunaidAli1/Testimonia.git
cd testimonia

2️⃣ Install dependencies

bun install

or

npm install

3️⃣ Environment variables

Create a .env file:

## Database

DATABASE_URL=

## Better Auth

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

## Public base URL

NEXT_PUBLIC_SELF_URL=http://localhost:3000

## Resend

RESEND_API_KEY=

## Cloudinary

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

## Google OAuth

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

4️⃣ Run the app
bun dev

or

npm run dev

📦 Project Structure
app/
├─ (auth)
├─ (dashboard)
├─ (landing)
├─ (otherroutes)
├─ (products)/products/[slug]
├─ api/auth/[...all]
├─ components
├─ embed
├─ Embla
├─ icons
├─ queries
├─ globals.css
├─ layout.tsx
└─ page.tsx

Route Groups

(auth) → login, signup, reset password

(dashboard) → authenticated user dashboard

(landing) → marketing & SEO pages

(otherroutes) → terms, privacy, about, contact

(products)/products/[slug] → space-specific routes

📁 Embed Routes
embed/
├─ wall
├─ social
└─ single

Public

iframe-only

No script injection

Automatically respects space.disabled

## 🔒 Privacy & Security

We do not sell or share user data

Testimonials are public only after approval

Spaces can be disabled instantly

Passwords are securely handled

Tokens expire automatically

## 🧪 Status

Testimonia is actively developed and evolving.
Breaking changes may occur in early versions.

🛣️ Roadmap

🌍 i18n support

📊 Embed analytics

🧵 Video testimonials

🎨 More embed themes

🧩 Web Components support

🛡️ Rate limiting & spam protection

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a feature branch

Submit a PR with a clear description

Found a bug or have an idea? Open an issue.

## 📄 License

MIT License

## 💬 Feedback

Testimonia is built with real-world usage in mind.
If you’re using it (or planning to), your feedback truly matters ❤️
