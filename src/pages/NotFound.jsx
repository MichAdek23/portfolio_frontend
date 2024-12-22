import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Import Font Awesome React components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';

// Styled components
const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 80px;
  background-color: #f9f9f9; // Soft neutral background color
  height: 100vh;
  font-family: 'Poppins', sans-serif; // Playful and modern font
`;

const Title = styled.h1`
  font-size: 3.5rem;  // Slightly larger title size for a more engaging look
  color: #333; // Dark gray text for readability
  margin-bottom: 20px;
  font-weight: 600; // Slightly bold title
  letter-spacing: 2px; // Adds more spacing between letters for playfulness
  text-transform: uppercase; // Capitalize the title for extra flair
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 6rem;  // Medium-sized icon
  color: #ff6347;  // Soft red color for the icon to match the theme
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.3rem;
  color: #666; // Lighter gray for the message, ensuring it's easy to read
  margin: 20px 0;
  line-height: 1.6; // Adds a little more space between lines for better readability
  max-width: 650px; // Keeps the message concise and avoids long line lengths
  margin: 0 auto; // Centers the message horizontally
  font-weight: 500; // Adds a playful weight to the text
  font-style: italic; // Adds a slight emphasis to the tone
`;

const HomeLink = styled(Link)`
  font-size: 1.2rem;
  color: #fff;  // White text for the button
  background-color: #007bff;  // Blue background for the button
  padding: 12px 25px;  // Padding for the button
  text-decoration: none;  // Remove underline
  border-radius: 30px;  // Rounded corners for the button effect
  font-weight: 600; // Bold the link text for emphasis
  text-transform: uppercase; // Capitalized text for the button feel

  &:hover {
    background-color: #0056b3;  // Darker blue when hovered, providing a clear interaction
    transform: scale(1.05);  // Slight scaling effect on hover for interactivity
    transition: all 0.3s ease; // Smooth transition for hover effects
  }

  &:active {
    background-color: #003f7d;  // Even darker blue when the button is clicked
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      {/* Broken Link Icon */}
      <Icon icon={faLinkSlash} />
      <Title>404 - Page Not Found</Title>
      <Message>Oops! Looks like you’ve hit a dead end. Try checking the URL or head back to the home page.</Message>
      <HomeLink to="/">Back to Home</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFound;
