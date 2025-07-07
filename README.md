PropTrack Client

A modern property management frontend built with React, TypeScript, and Vite. This application allows users to view, filter, and manage property listings based on their roles (Admin, Agent, or Client).

🔍 Features

🏠 Home banner for general users
🏘️ Property listings with dynamic filtering
🗕️ View property details and upcoming schedules
🔀 Dedicated pages for Rent and Sell categories
👤 Role-based experience (Admin, Agent, Client)


⚙️ Tech Stack
React + TypeScript
Vite
React Router DOM
Tailwind CSS


🚀 Getting Started

Prerequisites
Node.js (v16 or higher recommended)
npm


Installation

git clone <repo-url>
cd prop-track-client
npm install


Running the App

npm run dev
Access the app at: http://localhost:5173
Building for Production
npm run build

🗂️ Project Structure

src/
🍜 components/     # Reusable UI components
🍜 routes/         # Page-level routes
🍜 hooks/          # Custom hooks
🍜 lib/            # Utility functions
🍜 styles/         # CSS/Tailwind styles

👥 Switching User Roles

To test different user roles:
Open src/hooks/useUser.tsx
Find the mockUser object
Change the role value to "admin", "agent", or "client"


Example:
role: "client",

🗼️ Screenshots

![Dashboard](./Screenshot%202025-07-07%20at%2010.46.31%E2%80%AFAM.png)
![Property List](./Screenshot%202025-07-07%20at%2010.46.36%E2%80%AFAM.png)
![Home Banner](./Screenshot%202025-07-07%20at%2010.47.15%E2%80%AFAM.png)
![Rent Page](./Screenshot%202025-07-07%20at%2010.47.28%E2%80%AFAM.png)
![Sell Page](./Screenshot%202025-07-07%20at%2010.47.42%E2%80%AFAM.png)


📝 Assumptions

No authentication was required as part of the task
User roles are manually switched for testing
Backend APIs are assumed to be locally available


⚒️ Technical Decisions

React + Vite: Fast build time and modern tooling
TypeScript: Safer code and better DX
React Router: For SPA-style navigation


🌱 Future Enhancements
Add proper authentication (JWT/session)
Dark mode toggle
Mobile responsiveness improvements


⏱️ Time Spent
~8–10 hours


🧰 Tools Used

Cursor
Git + GitHub
Postman (API testing)
Chrome DevTools


📌 Notes

This project is part of an assessment and is not intended for production use. Please refer to the backend repo for API details.