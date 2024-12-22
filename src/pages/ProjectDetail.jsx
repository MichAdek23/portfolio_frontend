import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProjectById } from '../api';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Description = styled.p`
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const getProject = async () => {
      const data = await fetchProjectById(id);
      setProject(data);
    };
    getProject();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <Wrapper>
      <Title>{project.name}</Title>
      <ProjectImage src={project.image} alt={project.name} />
      <Description>{project.description}</Description>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        View Live Project
      </a>
    </Wrapper>
  );
}

export default ProjectDetail;
