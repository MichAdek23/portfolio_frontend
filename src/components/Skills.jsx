import React from 'react';
import styled from 'styled-components';

// Wrapper for the section
const SectionWrapper = styled.section`
  padding: 100px 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Section Title Styling
const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

// Section Content Styling
const SectionContent = styled.div`
  width: 100%; /* Full width of the screen */
  max-width: 1000px; /* Constrain to a maximum width */
  overflow: hidden; /* Ensure no content spills out of bounds */
  display: flex;
  justify-content: center;
  position: relative; /* Necessary for scroll positioning */

  @media (max-width: 768px) {
    max-width: 90%; /* Ensure it fits smaller screens */
  }
`;

// Scrollable Container for Skill Cards
const ScrollContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto; /* Allow horizontal scrolling */
  padding: 20px 0;
  scrollbar-width: none; /* Hide scrollbar in Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome/Edge/Safari */
  }
`;

// Skill Card Styling
const SkillCard = styled.div`
  flex: 0 0 auto; /* Fixed width for each card */
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 16px;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Show pointer cursor for interactivity */
  position: relative;
  transition: all 0.3s ease;

  /* Hover Effect */
  &:hover {
    transform: translateY(-15px) rotate(-5deg) scale(1.1); /* Add tilt and scale */
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2); /* Stronger shadow */
    background-color: ${({ theme }) => theme.colors.primary};
  }

  /* Click Effect */
  &:active {
    transform: translateY(5px) rotate(0deg) scale(0.95); /* Compress the card slightly */
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); /* Softer shadow */
    background-color: ${({ theme }) => theme.colors.secondary}; /* Alternate color on click */
  }
`;

// Skill Icon Styling
const SkillIcon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

// Skills Data (professional icons)
const skillsData = [
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
];

function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionTitle>Skills</SectionTitle>
      <SectionContent>
        {/* The scrollable container */}
        <ScrollContainer>
          {skillsData.map((skill, index) => (
            <SkillCard key={index}>
              <SkillIcon src={skill.icon} alt={`Skill ${index}`} />
            </SkillCard>
          ))}
        </ScrollContainer>
      </SectionContent>
    </SectionWrapper>
  );
}

export default Skills;
