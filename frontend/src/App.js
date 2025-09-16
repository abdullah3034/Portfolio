import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';

// Components
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Education from './components/Sections/Education';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';
import AdminLogin from './components/Admin/AdminLogin';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="App">
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg, #363636)',
                  color: 'var(--toast-color, #fff)',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />

            <Routes>
              {/* Admin Login Route */}
              <Route path="/admin" element={<AdminLogin />} />
              
              {/* Main Portfolio Route */}
              <Route path="/" element={
                <>
                  <Header />
                  <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Education />
                    <Contact />
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;

