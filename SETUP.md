# Local Development Setup Guide

This guide will help you set up the MERN stack portfolio website for local development.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd abdullah-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**
   ```bash
   # Backend environment variables
   cp backend/env.example backend/.env
   # Edit backend/.env with your configuration
   
   # Frontend environment variables (optional)
   cp frontend/env.example frontend/.env
   # Edit frontend/.env if needed
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Just update the MONGODB_URI in backend/.env
   ```

5. **Seed the database**
   ```bash
   cd backend
   node seed.js
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## 📁 Project Structure

```
abdullah-portfolio/
├── frontend/                 # React.js application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Layout/      # Header, Footer
│   │   │   ├── Sections/    # Hero, About, Skills, etc.
│   │   │   └── Admin/       # Admin dashboard components
│   │   ├── contexts/        # React contexts (Theme, Data)
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── package.json
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── vercel.json          # Vercel deployment config
├── backend/                  # Node.js/Express.js API
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Main server file
│   ├── seed.js              # Database seeding script
│   ├── package.json
│   ├── Procfile             # Heroku deployment
│   └── vercel.json          # Vercel deployment
├── package.json             # Root package.json
├── README.md                # Project documentation
├── SETUP.md                 # This file
└── DEPLOYMENT.md            # Deployment guide
```

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### Frontend Environment Variables

Create `frontend/.env` (optional):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. **Install MongoDB**
   - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
   - [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB service**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   # or
   mongod
   ```

3. **Verify connection**
   ```bash
   mongo
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create account** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create cluster** (free tier available)
3. **Get connection string** and update `MONGODB_URI` in backend/.env
4. **Configure network access** (add 0.0.0.0/0 for development)

## 📧 Email Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security > App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

### Alternative Email Services
- **SendGrid**: More reliable for production
- **Mailgun**: Good alternative
- **Outlook/Hotmail**: Similar setup to Gmail

## 🚀 Available Scripts

### Root Level
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start only backend
npm run client       # Start only frontend
npm run install-deps # Install all dependencies
npm run build        # Build frontend for production
```

### Backend
```bash
cd backend
npm start           # Start production server
npm run dev         # Start development server with nodemon
node seed.js        # Seed database with sample data
```

### Frontend
```bash
cd frontend
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
npm run eject       # Eject from Create React App
```

## 🔧 Development Tools

### Recommended VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **GitLens**

### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   
   # Kill process on port 5000
   npx kill-port 5000
   ```

2. **MongoDB connection issues**
   - Check if MongoDB is running
   - Verify connection string
   - Check network access (for Atlas)

3. **Node modules issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build errors**
   - Check Node.js version (should be v16+)
   - Clear browser cache
   - Check for syntax errors

### Performance Tips

1. **Use development tools**
   - React Developer Tools
   - Redux DevTools (if using Redux)
   - MongoDB Compass (for database)

2. **Hot reloading**
   - Frontend: Automatic with Create React App
   - Backend: Automatic with nodemon

3. **Debugging**
   - Use `console.log()` for quick debugging
   - Use VS Code debugger
   - Use browser dev tools

## 📚 Learning Resources

### MERN Stack
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)

### Styling & Animation
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Deployment
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com/)

## 🎯 Next Steps

1. **Customize the content**
   - Update personal information
   - Add your own projects
   - Modify skills and education

2. **Add new features**
   - Blog section
   - Testimonials
   - Advanced animations
   - Dark/light theme improvements

3. **Optimize performance**
   - Image optimization
   - Code splitting
   - Lazy loading

4. **Deploy to production**
   - Follow the deployment guide
   - Set up monitoring
   - Configure analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check this setup guide
2. Check the troubleshooting section
3. Search existing issues
4. Create a new issue with detailed information

Happy coding! 🚀

