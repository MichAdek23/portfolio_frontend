import React, { useRef } from 'react';
import styled from 'styled-components';

// Wrapper for the Blogs Section
const BlogsSection = styled.div`
  padding: ${({ theme }) => theme?.spacing(4) || '20px'};
`;

// Section Title
const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme?.spacing(2) || '16px'};
`;

// Section Subtitle
const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme?.colors?.textSecondary || '#666'};
  margin-bottom: ${({ theme }) => theme?.spacing(4) || '20px'};
`;

// Wrapper for Horizontal Scrolling
const BlogsWrapper = styled.div`
  display: flex;
  overflow-x: auto; /* Enables horizontal scrolling */
  gap: ${({ theme }) => theme?.spacing(4) || '20px'};
  scroll-snap-type: x mandatory; /* Ensures smooth snapping */
  -webkit-overflow-scrolling: touch; /* For smoother scrolling on mobile */

  /* Hide scrollbar on larger screens */
  @media (min-width: 768px) {
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; /* For Firefox */
  }
`;

// Individual Blog Card Styling
const BlogCard = styled.div`
  display: flex;
  flex-direction: column;
  background: translucent;
  padding: ${({ theme }) => theme?.spacing(3) || '16px'};
  box-shadow: 0px 4px 6px rgba(50, 48, 80, 0.9);
  border-radius: 8px;
  overflow: hidden;
  flex: 0 0 calc(33.333% - 20px); /* Cards take up one-third of the viewport minus gap */
  max-width: 300px; /* Ensures cards don't grow too large */
  scroll-snap-align: start; /* Snaps each card into view when scrolling */

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 12px 20px rgba(132, 122, 138, 0.25);
    background-color: rgba(138, 122, 122, 0.25);
    cursor: pointer;

  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 20px); /* 2 cards per view on smaller screens */
  }

  @media (max-width: 480px) {
    flex: 0 0 80%; /* Makes cards occupy 80% of the screen width on mobile */
  }
`;

// Blog Image Styling
const BlogImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

// Content Wrapper for Blog Details
const BlogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme?.spacing(2) || '12px'};
`;

// Button Styling
const BlogButton = styled.a`
  color: ${({ theme }) => theme?.colors?.primary || '#007bff'};
  text-decoration: underline;
  margin-top: ${({ theme }) => theme?.spacing(2) || '12px'};
`;

// Navigation Button Styling
const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 768px) {
    display: none; /* Hide navigation buttons on smaller screens */
  }
`;

// Wrapper for the entire section (to position navigation buttons)
const SectionWrapper = styled.div`
  position: relative;
`;

const Blogs = () => {
  const containerRef = useRef(null);

  // Scrolls the container left or right
  const scrollContainer = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Static blog data
  const blogs = [
    {
      _id: '1',
      title: 'Understanding React Hooks',
      excerpt: 'React Hooks allow you to use state and lifecycle features in functional components. Learn how to leverage them effectively.',
      image: 'https://via.placeholder.com/600x400?text=React+Hooks',
    },
    {
      _id: '2',
      title: 'Styling in React with Styled-Components',
      excerpt: 'Styled-Components is a powerful library for adding styles in React. Learn how to use it to create dynamic and reusable styles.',
      image: 'https://via.placeholder.com/600x400?text=Styled+Components',
    },
    {
      _id: '3',
      title: 'A Guide to Asynchronous JavaScript',
      excerpt: 'Master promises, async/await, and callbacks with this comprehensive guide to asynchronous programming in JavaScript.',
      image: 'https://via.placeholder.com/600x400?text=Async+JavaScript',
    },
    {
      _id: '4',
      title: 'Introduction to TypeScript',
      excerpt: 'TypeScript is a strongly typed programming language that builds on JavaScript. Discover how it can improve your code quality.',
      image: 'https://via.placeholder.com/600x400?text=TypeScript',
    },
  ];

  return (
    <BlogsSection>
      {/* Section Title and Subtitle */}
      <SectionTitle>My Blog</SectionTitle>
      <SectionSubtitle>
        Join me as I unravel the complexities of modern web development, from understanding frameworks to exploring cutting-edge technologies.
      </SectionSubtitle>

      <SectionWrapper>
        {/* Left Scroll Button */}
        <NavButton onClick={() => scrollContainer('left')} style={{ left: '10px' }}>
          &#8592;
        </NavButton>

        {/* Blog Cards */}
        <BlogsWrapper ref={containerRef}>
          {blogs.map((blog) => (
            <BlogCard key={blog._id}>
              <BlogImage src={blog.image} alt={blog.title} />
              <BlogContent>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <BlogButton href={`/blog/${blog._id}`}>Read More</BlogButton>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogsWrapper>

        {/* Right Scroll Button */}
        <NavButton onClick={() => scrollContainer('right')} style={{ right: '10px' }}>
          &#8594;
        </NavButton>
      </SectionWrapper>
    </BlogsSection>
  );
};

export default Blogs;
