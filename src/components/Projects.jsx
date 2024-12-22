import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchProjects } from '../api';

const ProjectsWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const ProjectCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ProjectButton = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
`;

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    getProjects();
  }, []);

  return (
    <ProjectsWrapper>
      {projects.map((project) => (
        <ProjectCard key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <ProjectButton href={`/project/${project.id}`}>Read More</ProjectButton>
        </ProjectCard>
      ))}
    </ProjectsWrapper>
  );
}

export default Projects;
