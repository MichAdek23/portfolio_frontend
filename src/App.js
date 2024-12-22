import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import BlogDetail from './pages/BlogDetail';
import NotFound from './pages/NotFound'; // Import the NotFound page
import AdminPage from './pages/AdminPage'
import GlobalStyles from './styles/globalStyles';
import { Helmet } from 'react-helmet'; // Import react-helmet for SEO
import { ThemeContextProvider } from './ThemeContext'; // Import ThemeContextProvider

function App() {
  return (
    <ThemeContextProvider> {/* Wrap the whole app in ThemeContextProvider */}
      <GlobalStyles />
      <Helmet>
        {/* Global SEO tags */}
        <title>Adeleke Michael Olamide</title>
        <meta name="description" content="Professional portfolio of Adeleke Michael Olamide. Showcasing projects, blogs, and reviews." />
        <meta name="keywords" content="portfolio, web development, projects, blogs, reviews, Adeleke Michael Olamide" />
        <meta name="author" content="Adeleke Michael Olamide" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
        <Footer />
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
