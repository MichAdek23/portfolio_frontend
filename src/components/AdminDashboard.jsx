import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { fetchProjectCount, fetchBlogCount, fetchReviewCount } from '../api';  

// Lazy-load the components
const ManageProjects = React.lazy(() => import('../components/ProjectManager'));
const ManageBlogs = React.lazy(() => import('../components/BlogManager'));
const ManageReviews = React.lazy(() => import('../components/ProjectManager'));
const ManageSlideshow = React.lazy(() => import('./ManageSlideshow')); // New Component

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows wrapping of elements on smaller screens */
  padding: 2rem;
  gap: 2rem; /* Adds space between sidebar and main content */
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 1rem;
  height: 100%; /* Ensures the sidebar matches the height of MainContent */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px); /* Optional: adds blur effect on background */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ensures the buttons align correctly */
  
  /* Responsive Design */
  @media (max-width: 768px) {
    width: 100%; /* Make the sidebar take full width on smaller screens */
    height: auto; /* Allow the sidebar to grow with content */
  }
`;

const SidebarButton = styled.button`
  display: block;
  margin: 1rem 0;
  padding: 1rem;
  background: ${(props) => (props.active ? '#0056b3' : '#007bff')};
  color: white;
  text-align: center;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px); /* Optional: adds blur effect on background */
  overflow-y: auto; /* Makes the content scrollable vertically */
  max-height: calc(100vh - 4rem); /* Ensures the content doesn't overflow outside the viewport */
  
  
  /* Responsive Design */
  @media (max-width: 768px) {
    padding: 1rem;
     
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
  }
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap; /* Allows the cards to wrap on smaller screens */
`;

const Card = styled.div`
  background-color: #007bff;
  color: white;
  padding: 1.5rem;
  flex: 1;
  min-width: 250px; /* Ensures cards are at least this wide */
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  /* Responsive Design */
  @media (max-width: 768px) {
    min-width: 100%; /* Cards will stack on smaller screens */
    margin-bottom: 1rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const CardCount = styled.p`
  font-size: 2rem;
  margin: 0;
`;

const AdminDashboard = () => {
  const [activeLink, setActiveLink] = useState('default');
  const [counts, setCounts] = useState({
    projects: 0,
    blogs: 0,
    reviews: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const projectCount = await fetchProjectCount();
        const blogCount = await fetchBlogCount();
        const reviewCount = await fetchReviewCount();
        setCounts({ projects: projectCount, blogs: blogCount, reviews: reviewCount });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const handleButtonClick = (section) => {
    setActiveLink(section);
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarButton
          active={activeLink === 'projects'}
          onClick={() => handleButtonClick('projects')}
        >
          Manage Projects
        </SidebarButton>
        <SidebarButton
          active={activeLink === 'blogs'}
          onClick={() => handleButtonClick('blogs')}
        >
          Manage Blogs
        </SidebarButton>
        <SidebarButton
          active={activeLink === 'reviews'}
          onClick={() => handleButtonClick('reviews')}
        >
          Manage Reviews
        </SidebarButton>
        <SidebarButton
          active={activeLink === 'slideshow'}
          onClick={() => handleButtonClick('slideshow')}
        >
          Manage Slideshow
        </SidebarButton> {/* New Sidebar Button */}
      </Sidebar>

      <MainContent>
        {activeLink === 'default' && (
          <CardContainer>
            <Card>
              <CardTitle>Projects</CardTitle>
              <CardCount>{counts.projects}</CardCount>
            </Card>
            <Card>
              <CardTitle>Blogs</CardTitle>
              <CardCount>{counts.blogs}</CardCount>
            </Card>
            <Card>
              <CardTitle>Reviews</CardTitle>
              <CardCount>{counts.reviews}</CardCount>
            </Card>
          </CardContainer>
        )}

        {/* Lazy-load and render the corresponding page content based on active link */}
        {activeLink === 'projects' && (
          <Suspense fallback={<div>Loading...</div>}>
            <ManageProjects />
          </Suspense>
        )}
        {activeLink === 'blogs' && (
          <Suspense fallback={<div>Loading...</div>}>
            <ManageBlogs />
          </Suspense>
        )}
        {activeLink === 'reviews' && (
          <Suspense fallback={<div>Loading...</div>}>
            <ManageReviews />
          </Suspense>
        )}
        {activeLink === 'slideshow' && (
          <Suspense fallback={<div>Loading...</div>}>
            <ManageSlideshow />
          </Suspense> // Render ManageSlideshow Component
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
