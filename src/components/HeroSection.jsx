import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slideshow from './Slideshow'; // Import the Slideshow component

// Styled components for the Hero section
const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh; /* Full viewport height */
  gap: ${({ theme }) => theme.spacing(4)};

  @media (min-width: 768px) {
    padding-top: 80px;
    flex-direction: row;
    padding: ${({ theme }) => theme.spacing(8)};
  }
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
    padding: 0 ${({ theme }) => theme.spacing(4)};
  }
`;

const Title = styled.h1`
  font-family: 'Gloock', 'Arial', sans-serif; /* Gothic font family */
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); /* Adds text-shadow to make the title pop */
  line-height: 1.2; /* Ensure title doesn't appear too stretched */

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1200px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: white; /* White color */
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  font-family: 'Courier New', Courier, monospace; /* Monospaced font for the typing effect */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Adds a subtle text-shadow to create a "word art" look */
  display: inline-block; /* Ensures the animation works properly */
  white-space: nowrap; /* Prevent text from wrapping */
  border-right: 4px solid white; /* Cursor effect */
  padding-right: 5px; /* Space for cursor */
  overflow: hidden; /* Hide overflow */
  animation: typing 4s steps(30) 1s forwards, blink 0.75s step-end infinite;

  ${({ animationDuration }) => `
    animation-duration: ${animationDuration}; /* Dynamic typing duration */
  `}

  @keyframes typing {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1200px) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  line-height: 1.6;
  max-width: 600px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    text-align: left;
  }

  @media (min-width: 1200px) {
    font-size: 1.25rem;
  }
`;

const Button = styled.a`
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transition: background-color 0.3s ease;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
  transform: rotate(-5deg); /* Initial tilt */
  transition: transform 0.3s ease-in-out; /* Smooth transition for animations */
  border: 5px solid #fff;
  border-radius: 20px;

  @media (min-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing(4)};
  }

  &:hover {
    transform: rotate(-3deg) scale(1.05); /* Slightly reduce tilt and scale up on hover */
  }

  &.clicked {
    transform: rotate(0deg) scale(1.1); /* Reset tilt and scale up when clicked */
  }

  img {
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);

    @media (min-width: 768px) {
      max-width: 600px;
    }

    @media (min-width: 1200px) {
      max-width: 700px;
    }
  }
`;

function HeroSection() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  // Set of different sentences to cycle through
  const sentences = [
    "an Engineering Student",
    "& Full-Stack Developer",
    "A builder of innovative solutions",
    "Explorer of the world's technology",
    "Passionate about sharing knowledge",
    "Curious about new technologies"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 5000); // Change sentence every 5 seconds
  
    return () => clearInterval(interval);
  }, [sentences.length]); // Add sentences.length to the dependency array

  return (
    <HeroWrapper>
      {/* Text Content */}
      <TextContent>
        <Title>I'm Michael</Title>
        {/* Apply typing effect for each sentence */}
        <Subtitle key={currentSentenceIndex} animationDuration="4s">
          {sentences[currentSentenceIndex]}
        </Subtitle>
        <Description>
          I’m passionate about building innovative solutions and sharing knowledge.
          Join me on my journey as I explore the world of engineering and technology.
        </Description>
        <Button href="#contact">Get in Touch</Button>
      </TextContent>

      {/* Image Content with Slideshow */}
      <ImageContainer>
        <Slideshow />
      </ImageContainer>
    </HeroWrapper>
  );
}

export default HeroSection;
