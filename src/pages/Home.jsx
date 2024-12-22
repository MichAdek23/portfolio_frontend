import React from 'react';
import HeroSection from '../components/HeroSection';
import Projects from '../components/Projects';
import Blogs from '../components/Blogs';
import Reviews from '../components/Reviews';
import Skills from '../components/Skills';  // Import the Skills component

function Home() {
  return (
    <>
      <div id="hero-section">
        <HeroSection />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="blogs">
        <Blogs />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <Skills />  {/* Include the Skills section */}
    </>
  );
}

export default Home;
