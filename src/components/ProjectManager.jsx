import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProjects, fetchProjectCount, deleteProject, fetchProjectById, addProject, updateProject, addImages } from '../api'; // Ensure all functions are imported
import { FaUpload } from 'react-icons/fa'; // Importing an icon for image upload

// Styled components for layout and UI enhancements
const Container = styled.div`
  padding: 20px;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProjectCard = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#007BFF' : '#dc3545')};
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const FormContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: transparent; /* Make the form background transparent */
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 5px;
  }
  input, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
`;

const UploadButton = styled.label`
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  margin-top: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const Icon = styled(FaUpload)`
  font-size: 20px;
`;

const ImagePreview = styled.img`
  width: 100px; /* You can adjust the size as per your requirement */
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
`;

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectCount, setProjectCount] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [projectForm, setProjectForm] = useState({ name: '', description: '', _id: null, images: [] });
  const [imagePreview, setImagePreview] = useState(null); // To store the image preview URL

  // Fetch all projects and project count on mount
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const projects = await fetchProjects();
        const count = await fetchProjectCount();
        setProjects(projects);
        setProjectCount(count);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to load projects.');
        setIsLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
    } catch (error) {
      setError('Failed to delete the project.');
    }
  };

  const handleEdit = async (id) => {
    try {
      const project = await fetchProjectById(id);
      setProjectForm({ ...project });
      setImagePreview(project.images[0] || null); // Set the image preview to the project's image
    } catch (error) {
      setError('Failed to fetch project for editing.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProjectForm((prevForm) => ({
        ...prevForm,
        images: Array.from(files),
      }));
      // Preview the first selected image
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, description, _id, images } = projectForm;
    
    // Validate only name and description fields, leaving images optional
    if (!name || !description) {
      setError('Please provide both name and description.');
      return;
    }
  
    try {
      let projectData = { name, description };
  
      // Only add images if they exist
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((file) => {
          formData.append('images', file);
        });
  
        // Add images using the API
        const uploadedImages = await addImages(formData);
        projectData = { ...projectData, images: uploadedImages }; // Assuming the server returns image URLs
      }
  
      if (_id) {
        // Edit an existing project
        await updateProject(_id, projectData);
        setSuccessMessage('Project updated successfully!');
      } else {
        // Create a new project
        await addProject(projectData);
        setSuccessMessage('Project created successfully!');
      }
  
      // Reset form and fetch updated list
      setProjectForm({ name: '', description: '', _id: null, images: [] });
      setImagePreview(null); // Reset the image preview
      setError('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
  
      // Re-fetch the projects after submit
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
    } catch (error) {
      setError('Failed to save the project.');
    }
  };
  

  return (
    <Container>
      <h1>Project Manager</h1>
      <p>Total Projects: {projectCount}</p>
      <Button primary onClick={() => setProjectForm({ name: '', description: '', _id: null, images: [] })}>
        Add New Project
      </Button>

      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <ProjectList>
          {projects.map((project) => (
            <ProjectCard key={project._id}>
              {project.images && project.images.length > 0 && (
                <CoverImage src={project.images[0]} alt={project.name} />
              )}
              <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div>
                <Button onClick={() => handleEdit(project._id)}>Edit</Button>
                <Button onClick={() => handleDelete(project._id)}>Delete</Button>
              </div>
            </ProjectCard>
          ))}
        </ProjectList>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <FormContainer>
        <h2>{projectForm._id ? 'Edit Project' : 'Create Project'}</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={projectForm.name}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <label htmlFor="description">Project Description</label>
            <textarea
              id="description"
              name="description"
              value={projectForm.description}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <label htmlFor="images">Project Images (Optional)</label>
            <UploadButton>
              <Icon />
              Upload Images
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the default file input
              />
            </UploadButton>
            {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />}
          </FormField>
          <Button primary type="submit">{projectForm._id ? 'Update Project' : 'Create Project'}</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default ProjectManager;
