# Dream Matrimony - Frontend

A modern, high-performance matrimony platform frontend built with React, Vite, and Tailwind CSS. Featuring premium animations and a mobile-responsive design.

## 🌟 Key Features
- **Modern Landing Page**: High-end aesthetic with GSAP-powered parallax and scroll-trigger animations.
- **Profile Explorer**: Advanced search and filtering (Age, Religion, Gender, Occupation) for registered visitors.
- **Admin Dashboard**: Full administrative control over profiles, including direct Cloudinary uploads and management.
- **Responsive Design**: Premium mobile-first experience with a custom navigation system.
- **Special Offers**: Exclusive limited-time membership packages (6 mo, 12 mo, Lifetime).
- **OTP Verification**: Secure registration flow with email OTP verification.

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Feedback**: React Hot Toast

## 📦 Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional for local):
   Create a `.env` file for Cloudinary settings if needed.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 🏗️ Project Structure
- `/src/components`: Reusable UI components (RegistrationForm, LoginForm, OtpVerification, etc.).
- `/src/pages`: Main page components (LandingPage, ProfilesPage, Dashboard, etc.).
- `/src/context`: Auth state management using Context API.
- `/public`: Static assets.

## 🔧 Backend Integration
The frontend is currently configured to connect to the production server:
`https://dream-matrimony-server.onrender.com/`

To change this for local development, update the API URLs in the components and context files to `http://localhost:5000`.
