import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll'; // Import from react-scroll for smooth scrolling
import { useTheme } from '../ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { AiFillGithub, AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background}; /* Adjust color for visibility */
  position: fixed; /* Change from relative to fixed */
  top: 0; /* Fix to the top of the viewport */
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for better visibility */
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;


const Brand = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #5F9EA0;
    padding: 20px;
    z-index: 100;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.mode === 'dark' ? '600' : '400'};
  text-decoration: none;
  position: relative;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transition: color 0.3s ease;
  }

  &.active {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.secondary};
    transition: width 0.3s ease;
  }

  &:hover:before {
    width: 100%;
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 8px;
  border-radius: 5px;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const HamburgerIconWrapper = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: none;
  position: relative;
  width: 30px;
  height: 25px;

  @media (max-width: 768px) {
    display: block;
  }

  & .line {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
  }

  & .line1 {
    top: 0;
    transform: ${({ isMenuOpen }) =>
      isMenuOpen ? 'rotate(45deg) translateY(10px)' : 'rotate(0)'};
  }

  & .line2 {
    top: 50%;
    transform: ${({ isMenuOpen }) => (isMenuOpen ? 'opacity(0)' : 'opacity(1)')};
    transform-origin: center;
  }

  & .line3 {
    bottom: 0;
    transform: ${({ isMenuOpen }) =>
      isMenuOpen ? 'rotate(-45deg) translateY(-10px)' : 'rotate(0)'};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavbarWrapper>
      <Brand>
        <Link to="hero-section" smooth={true} duration={500} style={{ color: theme === 'dark' ? theme.colors.textWhite : theme.colors.text }}>
          Adeleke Michael
        </Link>
      </Brand>

      <NavLinks isMenuOpen={isMenuOpen} ref={menuRef}>
        <NavLink to="hero-section" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        <NavLink to="projects" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
        <NavLink to="blogs" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Blogs</NavLink>
        <NavLink to="reviews" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Reviews</NavLink>
      </NavLinks>

      <SocialLinks>
        <SocialLink href="https://github.com/Michadek23" target="_blank">
          <AiFillGithub />
        </SocialLink>
        <SocialLink href="https://twitter.com/Michadek23" target="_blank">
          <AiFillTwitterCircle />
        </SocialLink>
        <SocialLink href="https://linkedin.com/in/Michadek23" target="_blank">
          <AiFillLinkedin />
        </SocialLink>
      </SocialLinks>

      <IconButton onClick={handleThemeChange}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </IconButton>

      <HamburgerIconWrapper onClick={toggleMenu} isMenuOpen={isMenuOpen}>
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
      </HamburgerIconWrapper>
    </NavbarWrapper>
  );
}

export default Navbar;
