# Abdullah's Portfolio Website

A modern, fully responsive portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring Tailwind CSS styling and Framer Motion animations.

## 🚀 Features

- **Modern Design**: Clean, professional, and attractive UI
- **Fully Responsive**: Optimized for desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Framer Motion powered animations
- **Contact Form**: Email integration with database storage
- **Admin Dashboard**: Content management system with JWT authentication
- **SEO Optimized**: Meta tags and OpenGraph support

## 🛠️ Tech Stack

### Frontend
- React.js with Hooks
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email functionality

## 📁 Project Structure

```
abdullah-portfolio/
├── frontend/          # React.js application
├── backend/           # Node.js/Express.js API
├── package.json       # Root package.json
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd abdullah-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5001) and frontend development server (port 3000).

## 🚀 Local Development

The portfolio is designed for local development only. Both frontend and backend run on your local machine.

## 📱 Sections

- **Hero**: Introduction with call-to-action
- **About**: Professional summary and background
- **Skills**: Technical skills with animated progress bars
- **Projects**: Portfolio projects with GitHub links
- **Education**: Academic background timeline
- **Contact**: Contact form with email integration

## 🔐 Admin Dashboard

Access the admin dashboard at `/admin` to:
- Manage projects
- Update skills
- Edit education information
- View contact form submissions

## 📧 Contact

- Email: abdullahishak3034@gmail.com
- LinkedIn: [Abdullah M.I.](https://www.linkedin.com/in/abdullah-m-i-8905182b0)
- GitHub: [abdullah3034](https://github.com/abdullah3034)

## 📄 License

This project is licensed under the MIT License.
