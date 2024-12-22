import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  background-color: transparent;
  color: white;
  margin-top: auto; /* Ensures the footer stays at the bottom */
`;

const FooterText = styled.p`
  color: white;
  font-weight: bold; /* Makes the text bold */
`;

const FooterLink = styled(Link)`
  color: gold;
  font-weight: bold;
  text-decoration: none; /* Removes underline */
  
  &:hover {
    text-decoration: underline; /* Adds underline on hover */
  }
`;

function Footer() {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year); // Set the current year when the component mounts
  }, []);

  return (
    <FooterWrapper>
      <FooterText>
        © {currentYear} <FooterLink to="/">Adeleke Michael Olamide</FooterLink>. All rights reserved.
      </FooterText>
    </FooterWrapper>
  );
}

export default Footer;
