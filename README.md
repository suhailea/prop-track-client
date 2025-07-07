# Property Management Assessment

This project is a Property Management web application built as part of an assessment. It allows users to view, filter, and manage property listings, as well as see upcoming schedules and offers. The application is built using React, TypeScript, and Vite for a fast and modern development experience.

## Features
- Home banner for regular users
- Property listing with filtering options
- View property details and upcoming schedules
- Separate routes for renting and selling properties

## Technologies Used
- React
- TypeScript
- Vite
- React Router

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd prop-track-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the development server, run:
```bash
npm run dev
```
This will start the app at [http://localhost:5173](http://localhost:5173) (or another available port).

### Building for Production
To build the app for production, run:
```bash
npm run build
```

## Project Structure
- `src/components/` - UI components and layouts
- `src/routes/` - Route components for different pages
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions
- `src/styles/` - CSS styles

## Notes
- This project is for assessment purposes and may not include full backend integration or authentication.

## Switching User Role

To test the application with different user roles (admin, agent, or client), you can manually change the mock user role:

1. Open the file: `src/hooks/useUser.tsx`
2. Find the `mockUser` object.
3. Change the `role` property to one of the following: `"admin"`, `"agent"`, or `"client"`.
   For example, to switch to client:
   ```ts
   role: "client",
   ```
4. Save the file. The application will now behave according to the selected user role.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.